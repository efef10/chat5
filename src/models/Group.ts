

export {};
import {User} from './User';

// const {childNode}   = require('./Node.ts');
// import * as childNode from "./Node";

export interface IMessage{
    content:string
    date:Date
    userName:string
}


interface IGroup{
    getType():string
    getGroupName():string
    getChildren():object[]
    setChildren(children:object[]):void
    getParent():Group|null
    setParent(parent:Group):void
    addUser(user:User):Group|null
    removeUser(userName:string):boolean
    addNewGroup(groupName:string):boolean
    removeGroup(groupName:string):boolean
    userInGroup(userName:string):boolean
    groupAlreadyInGroup(groupName:string):boolean
    hasChildren():boolean
    flat():boolean
    addMessage(message:IMessage):void
    getMessages():IMessage[]
}

export class Group implements IGroup{ //

    private type:string;
    private name:string;
    private children:object[];
    private parent:Group|null;
    private messages:IMessage[]

    constructor(groupName:string, children:object[], parent:Group|null,messages?:IMessage[]) {
        this.type = "group"
        this.name  = groupName;
        this.children   = children || [];
        this.parent = parent || null;
        this.messages = messages || [];
    }

    // ----------GET-SET:------------
    // ------------------------------
    public getType(){
        return this.type;
    }

    public getMessages(){
        return this.messages;
    }

    public setMessages(messages:IMessage[]){
        this.messages = messages;
    }

    public addMessage(message:IMessage){
        if(this.messages.length === 0){
            this.messages.push(message);
            return;
        }
        let lastMessage = this.messages[this.messages.length-1];
        if(lastMessage.userName===message.userName){
            lastMessage.content += ('\n'+  message.content);//lastMessage.content.concat('\n' + '\n' + message.content)
            lastMessage.date = message.date;
        }
        else{
            this.messages.push(message);
        }
    }

    public getGroupName(){
        return this.name;
    }

    public getChildren(){
        return this.children;
    }

    public setChildren(newChildren:object[]){
        this.children = newChildren;
    }

    public getParent(){
        return this.parent;
    }

    public setParent(parent:Group){
        this.parent = parent;
    }
    // ------------------------------
    // ------------------------------


    // -------ADD/REMOVE FROM GROUP:-------
    // ------------------------------------
    public addUser(user:User){
        if((!this.hasChildren()) || (this.children[0] instanceof User)) {
            this.children.push(user);
            return this;
        }
        else{
            if(this.groupAlreadyInGroup("others")){
                for(var i =0; i<this.children.length ; i++){
                    let group = this.children[i] as Group;
                    if(group.getGroupName()==="others"){
                        if(group.userInGroup(user.getUserName())){
                            return null;
                        }
                        else{
                            // user.setParent(this.children[i]);
                            group.addUser(user);
                            return group;
                        }
                    }
                }
                return null;
            }
            this.children.push(new Group("others", [user], this));
            return this;
        }
    }

    public removeUser(userName:string){
        let found = false;
        if(this.hasChildren() && (this.children[0] instanceof User)){
            this.children.forEach((child, i)=>{
                let user = child as User;
                if (user.getUserName() === userName){
                    this.children.splice(i,1);
                    found = true;
                    // return true;
                }
                // return undefined;
            });
            return found;//retrun true fixme
        }
        else{
            return false;
        }
    }

    public addNewGroup (groupName:string){
        if(this.hasChildren() && (this.children[0] instanceof User)){
            if(groupName === "others"){
                return false;
            }
            var tmpGroup= new Group("others",this.children, this,this.getMessages());
            this.children = [];
            this.messages = [];
            this.children.push(tmpGroup);
        }
        //anyway, insert a new group:
        this.children.push(new Group(groupName,[],this));
        return true;
    }

    public removeGroup(groupName:string){
        if(!this.hasChildren() || (this.children[0] instanceof User)){
            return false;
        }
        for(var i=0 ; i<this.children.length ; i++){
            let group = this.children[i] as Group;
            if(group.getGroupName() === groupName){
                this.children.splice(i,1);
                return true;
            }
        }
        return false;
    }
    // ------------------------------------
    // ------------------------------------


    // ---BOOLEAN HELP FUNCTIONS:-------
    // ---------------------------------
    public userInGroup(userName:string){
        var children = this.children;
        if (!this.hasChildren() || children[0] instanceof Group){
            return false;
        }

        for(var i=0 ; i< children.length; i++){
            let user = children[i] as User
            if(user.getUserName() === userName){
                return true;
            }
        }
        return false
    }

    public groupAlreadyInGroup(groupName:string){
        var children = this.children;
        if (!this.hasChildren() || children[0] instanceof User){
            return false;
        }
        for(var i=0 ; i< children.length; i++){
            let group = children[i] as Group;
            if(group.getGroupName() === groupName){
                return true;
            }
        }
        return false;
    }

    public hasChildren(){
        return this.children.length !== 0;
    }
    // ---------------------------------
    // ---------------------------------


    public showGroupPath(){
        var path = this.name;
        let parent = this.getParent();
        while(parent){
            path = parent.getGroupName() + ">" + path;
            parent = parent.getParent();
        }
        return path;
    }

    public flat(){
        let parent = this.getParent()
        if( parent === null){
            return false;
        }
        if(parent.getChildren().length === 1){
            var children = this.getChildren();
            if(children.length>0 && children[0] instanceof User){
                parent.setChildren(children);
                return true;
            }
            for (var i=0;i<children.length;i++){
                let group = children[i] as Group;
                group.setParent(parent);
            }
            parent.setChildren(children);
            return true;
        }
        return false;
    }
}

// module.exports.Group = Group;