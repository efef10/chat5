import {Group} from './Group';
import {User} from './User';
import {DB} from '../lib/db';

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

    public async allGroups(arr?:Group[], currentGroup?:Group|null){
        let groups = await groupsDB.getData()
        return groups;
        // let foundGroups = arr || [];
        // let group = currentGroup;
        // if(group === undefined){
        //     group = (await this.getRoot() as Group);
        // }
        //
        // if (!!group){
        //     foundGroups.push(group);
        // }
        //
        // if (group === null || !Group.hasChildren(group)){
        //     return foundGroups;
        // }
        // var children = Group.getChildren(group);
        // if((children[0] as any).type === "group"){
        //     for (var i=0 ; i<children.length; i++){
        //         this.allGroups(foundGroups, children[i] as Group);
        //     }
        // }
        // return foundGroups;
    }

    public async addInitialGroup(groupName:string){
        if(this._rootIsNull()){
            await groupsDB.initiate();
            await groupsDB.addData({id:new Date().getUTCMilliseconds(),type:"group",name:groupName, messages:[],parent:null,children:[]})
            await groupsDB.getData().then((data)=>{
                this.root = data[0];
            });
            return true;
        }
        return false;
    }

    public async addGroup(newGroupName:string,toGroupID:number){
        if(this._rootIsNull()){
            await groupsDB.initiate()
        }

        let newGroup = {type:"group",name:newGroupName,id:new Date().getUTCMilliseconds()}
        groupsDB.addData(newGroup);
        let connector = {type:"group",parentId:toGroupID,childId:newGroup.id};
        groupsToUsersDB.addData(connector);
        // let myGroup = this.getGroupById(toGroupID);
        // if(!!myGroup){
        //     Group.addNewGroup(myGroup,newGroupName);
        //     await groupsDB.setMyData([this.root]);
        // }
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

    public async deleteGroup(groupId:number){
        let deletedGroup = await groupsDB.deleteData(groupId,"id");
        await this.deleteConnectors(groupId);
        return deletedGroup;
        // let connectors = await groupsToUsersDB.getData();
        // for(let connector of connectors){
        //     if(connector.childId === groupId){
        //         groupsToUsersDB.deleteData(connector.childId,"childId");
        //     }
        //     if(connector.parentId === groupId){
        //         groupsToUsersDB.deleteData(connector.childId,"parentId");
        //     }
        // }

        // let group = this.getGroupById(groupId);
        // let parentId;
        // if(!!group){
        //     parentId = Group.getParent(group);
        //     if(!!parentId){
        //         let parent = this.getGroupById(parentId);
        //         if(!!parent){
        //             let children = Group.getChildren(parent);
        //             let index = children.indexOf(group);
        //             Group.removeGroup(parent,index);
        //             await groupsDB.setMyData([this.root]);
        //         }
        //
        //     }
        // }
    }

    public async getConnectors(groupId:number){
        let connectors = await groupsToUsersDB.getData()
        let mapped =  connectors.filter((connector)=>{
            return connector.parentId === groupId;
        })
        return mapped;
    }

    public async deleteConnectors(groupId:number){
        let connectors = await groupsToUsersDB.getData();
        for(let connector of connectors){
            if(connector.childId === groupId){
                await groupsToUsersDB.deleteData(connector.childId,"childId");
            }
            if(connector.parentId === groupId){
                await groupsToUsersDB.deleteData(connector.parentId,"parentId");
                await this.deleteGroup(connector.childId)
            }
        }
    }

    public async deleteConnector(groupId:number,childId:number,type:string){
        let deletedConnector = await groupsToUsersDB.deleteData(childId,"childId",groupId);
        if(type==="group"){
            await this.deleteGroup(childId)
        }
        return deletedConnector;
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