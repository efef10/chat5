import {Group} from './Group';
import {User} from './User';
import {DB} from '../lib/db';
import * as uniqid from 'uniqid';

const groupsDB = new DB("groups");
const groupsToUsersDB = new DB("userToGroups");



interface INAryTree{
    getRoot():Promise<any>
    allGroupsOfUser(userName:string, arr:Group[], currentGroup:Group):Group[]
    allGroupsNames(currentGroup:Group|null,currentAllGroups:string[]):string[]
    // showGroupPath(group:Group):string
    returnGroupsAndUsers():{level:number, name:string, type:string, count:number}[]
    // _returnGroupsAndUsers(group:Group, arr:{level:number, name:string, type:string, count:number}[], level:number):number
    _rootIsNull():boolean
    getGroupByPath(path:string):Group|null
    deleteTree():void
    // searchGroup(groupName:string, currentGroup:Group, groups:string[]):string[]
    addInitialGroup(groupName:string):Promise<any>
    getGroupById(groupId:number):Group|null
}

export class nAryTree implements INAryTree{
    private root:Group|null;
    // private treeName:string;

    constructor(groupName?:string){
        groupsDB.getData().then((root)=>{
            !!root?this.root=root[0]:this.root=null;
        })
        // this.treeName = groupName || "nAryTreeGroup";
    }

    public async getRoot():Promise<any>{
        const root = await groupsDB.getData()
        if(!!root){
            return root[0];
        }
    }

    public _rootIsNull(){
        return !this.root;
        // return this.root === null;
    }

    public async allGroups(){
        let groups = await groupsDB.getData()
        return groups;
    }

    public async addInitialGroup(groupName:string){
        if(this._rootIsNull()){
            await groupsDB.initiate();
            await groupsDB.addData({id:uniqid(),type:"group",name:groupName, messages:[],parent:null,children:[]})
            await groupsDB.getData().then((data)=>{
                this.root = data[0];
            });
            return true;
        }
        return false;
    }

    public async addGroup(newGroupName:string,toGroupID:string){
        if(this._rootIsNull()){
            await groupsDB.initiate()
        }

        let newGroup = {type:"group",name:newGroupName,id:uniqid()}
        let connectors = await groupsToUsersDB.getData();
        let myConnectors = connectors.filter((connector)=>{
            return connector.parentId === toGroupID;
        })

        await groupsDB.addData(newGroup);
        let connector = {type:"group",parentId:toGroupID,childId:newGroup.id};
        await groupsToUsersDB.addData(connector);

        if(myConnectors.length>0 && myConnectors[0].type ==="user"){
            let newGroupOthers = {type:"group",name:"others",id:uniqid()}
            await groupsDB.addData(newGroupOthers);
            await groupsToUsersDB.addData({type:"group",parentId:toGroupID,childId:newGroupOthers.id});
            //=== update the new parent of the users:  ===
            await groupsToUsersDB.editData([{"field":"parentId","value":toGroupID},{"field":"type","value":"user"}],[{"field":"parentId","value":newGroupOthers.id}])
            //============================================
        }
        return newGroup;
    }

    public async addConnector(groupId:string,connectorId:string,type:string){
        if(type === "user"){
            let connectors = await groupsToUsersDB.getData();
            let myConnectors = connectors.filter((connector)=>{
                return connector.parentId === groupId;
            })

            let newConnector
            if(myConnectors.length>0 && myConnectors[0].type ==="group") {
                let newGroupOthers = {type:"group",name:"others",id:uniqid()}
                await groupsDB.addData(newGroupOthers);
                await groupsToUsersDB.addData({type:"group",parentId:groupId,childId:newGroupOthers.id});
                newConnector = {type:type,parentId:newGroupOthers.id,childId:connectorId};
            }
            else{
                newConnector = {type:type,parentId:groupId,childId:connectorId};
            }
            return await groupsToUsersDB.addData(newConnector);
        }
        else{
            return {message:"not supported yet"};
        }
    }

    public getGroupById(groupId:number,currentGroup?:Group):Group|null{
        let group:Group|undefined|null = currentGroup;
        if(group === undefined){
            group = this.root;
        }

        if (!!group && (group as any).id === groupId){
            return group;
        }

        if (group === null || !Group.hasChildren(group)){
            return null;
        }
        var children = Group.getChildren(group);
        if((children[0] as any).type === "group"){
            for (var i=0 ; i<children.length; i++){
                let result = this.getGroupById(groupId, children[i] as Group);
                if(!!result){
                    return result;
                }
            }
        }
        return null;
    }

    public async deleteGroup(groupId:string){
        let deletedGroup = await groupsDB.deleteData([{"field":"id","value":groupId}]);
        await this.deleteConnectors(groupId);
        return deletedGroup;
    }

    public async getConnectors(groupId:string){
        let connectors = await groupsToUsersDB.getData()
        let mapped =  connectors.filter((connector)=>{
            return connector.parentId === groupId;
        })
        return mapped;
    }

    public async deleteConnectors(groupId:string){
        let connectors = await groupsToUsersDB.getData();
        for(let connector of connectors){
            if(connector.childId === groupId){
                await groupsToUsersDB.deleteData([{"field":"childId","value":connector.childId}]);
            }

            if(connector.parentId === groupId){
                await groupsToUsersDB.deleteData([{"field":"parentId","value":connector.parentId}]);
                await this.deleteGroup(connector.childId)
            }
        }
    }

    public async deleteConnector(groupId:string,childId:string,type:string){
        let deletedConnector = await groupsToUsersDB.deleteData([{"field":"childId","value":childId},{"field":"parentId","value":groupId}]);
        if(type==="group"){
            await this.deleteGroup(childId)
        }
        return deletedConnector;
    }

    public async getTree(){
        let myRoot;
        myRoot=new Group(123,"gh",[],null);
        let myTree={};
        let groups = await groupsDB.getData();
        let connectors = await groupsToUsersDB.getData();

        let connectorsWithNames = connectors.map((connector)=>{
            if(connector.type === "group"){
                for(let group of groups){
                    if(group.id === connector.childId){
                        return {type:connector.type,childId:connector.childId,parentId:connector.parentId,name:group.name};
                    }
                }
            }
            else{//fixme fetch users names

                return connector;
            }
            // return "";
        });

        for(let connector of connectorsWithNames){
            if(connector.parentId===""){
                myRoot = new Group(connector.childId,connector.name,[],null);
            }
            else if(!myTree[connector.parentId]){
                if(connector.type === "user"){
                    myTree[connector.parentId] = [new User(connector.childId,"user1",23,"")]
                }
                else{
                    myTree[connector.parentId] = [new Group(connector.childId,connector.name,[],connector.parentId)]
                }
            }
            else{
                if(connector.type === "user"){
                    myTree[connector.parentId].push(new User(connector.childId,"user1",23,""));
                    //fixme
                }
                else {
                    myTree[connector.parentId].push(new Group(connector.childId, connector.name, [], connector.parentId))
                }
            }
        }
        this.generateTree(myRoot,myTree);
        return myRoot;
    }

    public generateTree(group:Group,tmpTree:any){
        let currentGroup = group;
        let children = tmpTree[currentGroup.getId()];
        // let childrenToGroups = children.map((child)=>{
        //     groups.getData(child)
        // })
        if(!!children){
            currentGroup.setChildren(children)
            for(let child of children){
                if(child.type === "user"){
                    return
                }
                this.generateTree(child,tmpTree)
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    public allGroupsOfUser(userName:string, arr?:Group[], currentGroup?:Group|null){
        var foundGroups = arr || [];
        var group = currentGroup;
        if(group === undefined){
            group = this.root;
        }
        if (group === null || !Group.hasChildren(group)){
            return foundGroups;
        }
        var children = Group.getChildren(group);
        if(children[0] instanceof User){
            for (var i=0 ; i<children.length; i++){
                let user = children[i] as User;
                if(user.getUserName()===userName){
                    foundGroups.push(group);
                    break;
                }
            }
        }
        else{
            for (var i=0 ; i<children.length; i++){
                this.allGroupsOfUser(userName, foundGroups, children[i] as Group);
            }
        }
        return foundGroups;
    }

    public allGroupsNames(currentGroup?:Group|null,currentAllGroups?:string[]){
        var allGroups = currentAllGroups || [];
        var group = currentGroup;
        if(group === undefined){
            group = this.root;
        }
        if(!group){
            return allGroups;
        }
        allGroups.push(group.getGroupName());
        var children = Group.getChildren(group);
        if(!Group.hasChildren(group) || children[0] instanceof User){
            return allGroups;
        }
        for (var i=0 ; i< children.length ; i++){
            this.allGroupsNames(children[i] as Group,allGroups)
        }
        return allGroups;

    }

    // public showGroupPath(group:Group){
    //     var path = group.getGroupName();
    //     // while(group.getParent()){
    //     //     path = group.getParent().getGroupName() + ">" + path;
    //     //     group = group.getParent();
    //     // }
    //     let parent = group.getParent();
    //     while(parent){
    //         path = parent.getGroupName() + ">" + path;
    //         parent = parent.getParent();
    //     }
    //     return path;
    // }

    public returnGroupsAndUsers(){
        var myGroup = this.root;
        var myLevel = 0;
        let arr:{level:number, name:string, type:string, count:number}[];
        arr = [];
        if(!!myGroup){
            this._returnGroupsAndUsers(myGroup, arr, myLevel);
        }
        return arr;
    }

    private _returnGroupsAndUsers(group:Group, arr:{level:number, name:string, type:string, count:number}[], level:number){
        var myGroup = group;
        var myLevel = level;
        var arr = arr || [];
        if(myGroup === null){
            return 0;
        }
        if(!Group.hasChildren(myGroup)){
            arr.push({level:myLevel,
                name :myGroup.getGroupName(),
                type :"Group",
                count:0});
            return 0;
        }
        var children = Group.getChildren(myGroup);
        if(children[0] instanceof User){
            for (var i=children.length-1 ; i>=0; i--){
                arr.push({level:myLevel + 1,
                    name :(children[i] as User).getUserName(),
                    type :"User",
                    count:0});
            }
            arr.push({level:myLevel,
                name :myGroup.getGroupName(),
                type :"Group",
                count:children.length});
            return children.length;
        }
        var sum = 0;
        for (var i=children.length -1; i>=0 ; i--){
            sum+=this._returnGroupsAndUsers(children[i] as Group,arr,myLevel+1);
        }
        arr.push({level:myLevel,
            name :myGroup.getGroupName(),
            type :"Group",
            count:sum});
        return sum;

    }

    public getGroupByPath(path:string){
        var arr = path.split(">");
        var group = this.root;
        if (group === null){
            return null;
        }
        if(!((group as Group).getGroupName() === arr[0])){
            return null;
        }
        for (var i=1; i<arr.length ; i++){
            let children = Group.getChildren(group);
            if(children.length === 0 || children[0] instanceof User){
                return null;
            }
            for(var j=0; j<children.length; j++){
                if((children[j] as Group).getGroupName() === arr[i]){
                    group = (children[j] as Group);
                    break;
                }
            }
            // return false;
        }
        if(!!group){
            return group;
        }
        return null;
    }

    public deleteTree(){
        groupsDB.deleteFileContent();
        groupsToUsersDB.deleteFileContent();
        this.root = null;
    }

    // public searchGroup(groupName:string, currentGroup?:Group, groups?:string[]){
    //     var foundGroupsArr = groups || [];
    //     if(this.root === null){
    //         return foundGroupsArr;
    //     }
    //     var group = currentGroup;
    //     if(group === undefined){
    //         group = this.root;
    //     }
    //     if(group.getGroupName() === groupName){
    //         foundGroupsArr.push(this.showGroupPath(group))
    //     }
    //     if((!Group.hasChildren(group)) || (Group.getChildren(group)[0] instanceof User)){
    //         return foundGroupsArr;
    //     }
    //     var children = Group.getChildren(group);
    //     for(var i=0 ; i<children.length; i++){
    //         this.searchGroup(groupName, children[i] as Group,foundGroupsArr);
    //     }
    //     return foundGroupsArr;
    // }


}


// module.exports.nAryTree = nAryTree;