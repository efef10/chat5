"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Group = /** @class */ (function () {
    function Group(id, groupName, children, parent, messages) {
        this.type = "group";
        this.id = id;
        this.name = groupName;
        this.children = children || [];
        this.parent = parent || null;
        this.messages = messages || [];
    }
    // ----------GET-SET:------------
    // ------------------------------
    Group.prototype.getType = function () {
        return this.type;
    };
    Group.prototype.getId = function () {
        return this.id;
    };
    Group.prototype.getMessages = function () {
        return this.messages;
    };
    Group.prototype.setMessages = function (messages) {
        this.messages = messages;
    };
    Group.prototype.addMessage = function (message) {
        if (this.messages.length === 0) {
            this.messages.push(message);
            return;
        }
        var lastMessage = this.messages[this.messages.length - 1];
        if (lastMessage.userName === message.userName) {
            lastMessage.content += ('\n' + message.content); //lastMessage.content.concat('\n' + '\n' + message.content)
            lastMessage.date = message.date;
        }
        else {
            this.messages.push(message);
        }
    };
    Group.prototype.getGroupName = function () {
        return this.name;
    };
    Group.getChildren = function (group) {
        return group.children;
    };
    Group.prototype.setChildren = function (newChildren) {
        this.children = newChildren;
    };
    // public getParent(){
    //     return this.parent;
    // }
    //
    // public setParent(parent:Group){
    //     this.parent = parent;
    // }
    // ------------------------------
    // ------------------------------
    // -------ADD/REMOVE FROM GROUP:-------
    // ------------------------------------
    // public addUser(user:User){
    //     if((!this.hasChildren()) || (this.children[0] instanceof User)) {
    //         this.children.push(user);
    //         return this;
    //     }
    //     else{
    //         if(this.groupAlreadyInGroup("others")){
    //             for(var i =0; i<this.children.length ; i++){
    //                 let group = this.children[i] as Group;
    //                 if(group.getGroupName()==="others"){
    //                     if(group.userInGroup(user.getUserName())){
    //                         return null;
    //                     }
    //                     else{
    //                         // user.setParent(this.children[i]);
    //                         group.addUser(user);
    //                         return group;
    //                     }
    //                 }
    //             }
    //             return null;
    //         }
    //         this.children.push(new Group("others", [user], this));
    //         return this;
    //     }
    // }
    // public removeUser(userName:string){
    //     let found = false;
    //     if(this.hasChildren() && (this.children[0] instanceof User)){
    //         this.children.forEach((child, i)=>{
    //             let user = child as User;
    //             if (user.getUserName() === userName){
    //                 this.children.splice(i,1);
    //                 found = true;
    //                 // return true;
    //             }
    //             // return undefined;
    //         });
    //         return found;//retrun true fixme
    //     }
    //     else{
    //         return false;
    //     }
    // }
    Group.addNewGroup = function (group, groupName) {
        // if(Group.hasChildren(group) && (this.children[0] instanceof User)){
        //         //     if(groupName === "others"){
        //         //         return false;
        //         //     }
        //         //     var tmpGroup= new Group("others",this.children, this,this.getMessages());
        //         //     this.children = [];
        //         //     this.messages = [];
        //         //     this.children.push(tmpGroup);
        //         // }
        //anyway, insert a new group:
        group.children.push({ id: new Date().getUTCMilliseconds(), type: "group", name: groupName, children: [], messages: [], parent: group.id });
        return true;
    };
    Group.getParent = function (group) {
        return group.parent;
    };
    Group.removeGroup = function (myGroup, index, groupName) {
        // if(!this.hasChildren() || (this.children[0] instanceof User)){
        //     return false;
        // }
        myGroup.children.splice(index, 1);
        // for(var i=0 ; i<myGroup.children.length ; i++){
        //     let group = myGroup.children[i] as Group;
        //     if(group.name === groupName){
        //         myGroup.children.splice(i,1);
        //         return true;
        //     }
        // }
        // return false;
    };
    // ------------------------------------
    // ------------------------------------
    // ---BOOLEAN HELP FUNCTIONS:-------
    // ---------------------------------
    // public userInGroup(userName:string){
    //     var children = this.children;
    //     if (!this.hasChildren() || children[0] instanceof Group){
    //         return false;
    //     }
    //
    //     for(var i=0 ; i< children.length; i++){
    //         let user = children[i] as User
    //         if(user.getUserName() === userName){
    //             return true;
    //         }
    //     }
    //     return false
    // }
    // public groupAlreadyInGroup(groupName:string){
    //     var children = this.children;
    //     if (!this.hasChildren() || children[0] instanceof User){
    //         return false;
    //     }
    //     for(var i=0 ; i< children.length; i++){
    //         let group = children[i] as Group;
    //         if(group.getGroupName() === groupName){
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    Group.hasChildren = function (group) {
        return (!!group && !!group.children && group.children.length !== 0);
    };
    Group.addGroup = function (newGroupName, toGroupID) {
    };
    return Group;
}());
exports.Group = Group;
// module.exports.Group = Group;
//# sourceMappingURL=Group.js.map