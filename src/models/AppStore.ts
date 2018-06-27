// import {listeners} from "cluster";
import {Group} from './Group';
// import {Chat} from './Chat';

import {Api} from '../../src/api'
import {IMessage} from './Group';
import * as io from 'socket.io-client';
export const socket = io.connect("http://localhost:4000");
// interface observer{
//     type:string,
//     listeners: Function[];
// }


export interface AppState {
    // chat : Chat
    chatId:string;
    selectedGroup:string;
    loggedUser:string;
    chattingWithUser:string;
    componentTreeShouldUpdate:boolean;
}

export class AppService {
    listeners: Function[];
    users: any[];
    groups: any[];
    tree:Group[];
    messages:IMessage[];
    groupName:string
    // selectedGroup:Group|null;
    // loggedUser:string;
    // chattingWithUser:string;
    // users: User[];


    constructor(){
        this.listeners = [];
        this.users=[];
        this.groups=[];
        this.messages=[];
        this.groupName="";
        this.tree=[];
        appStore.loggedUser = "";
        appStore.chattingWithUser="";
    }

    getUsers(): Promise<any>{
        return Api.getUsers()
            .then((users)=>{
                this.users=users;
                this.onStoreChanged();
            });

    }

    getGroups(): Promise<any>{
        return Api.getGroups()
            .then((groups)=>{
                this.groups=groups;
                this.onStoreChanged();
            });

    }

    editUser(userId:string,updates:{field:string,value:any}[]){
        return Api.editUser(userId,updates)
            .then((user)=>{
                Api.getUsers()
                    .then((users)=>{
                        this.users=users;
                        this.onStoreChanged();
                    });
                return user;
            })
    }

    deleteUser(userId:string){
        return Api.deleteUser(userId)
            .then((user)=>{
                Api.getUsers()
                    .then((users)=>{
                        this.users=users;
                        this.onStoreChanged();
                    });
                return user;
            })
    }

    deleteGroup(groupId:string){
        return Api.deleteGroup(groupId)
            .then((group)=>{
                Api.getGroups()
                    .then((groups)=>{
                        this.groups=groups;
                        this.onStoreChanged();
                    });
                return group;
            })
    }

    addUser(username:string,password:string,age:number,imageUrl?:string){
        return Api.addUser({name:username,password:password,age:age,imageUrl:imageUrl || ""})
            .then((user)=>{
                Api.getUsers()
                    .then((users)=>{
                        this.users=users;
                        this.onStoreChanged();
                    });
                if(!user){
                    alert("username already exists");
                }
                return user;
            })
    }

    addGroup(groupName:string,toGroupID:string){
        debugger
        return Api.addGroup(groupName,toGroupID)
            .then((group)=>{
                Api.getGroups()
                    .then((groups)=>{
                        this.groups=groups;
                        this.onStoreChanged();
                    });
                return group;
            })
    }

    addUserToGroup(userId:string,toGroupID:string){
        return Api.addConnector(userId,toGroupID,"user")
            .then((connector)=>{
                Api.getGroups()
                    .then((groups)=>{
                        this.groups=groups;
                        this.onStoreChanged();
                    });
                return connector;
            })
    }

    async allChildrenOfGroup(groupId:string){
        let connectors = await Api.getConnectors(groupId);
        if(!connectors || !connectors[0]){
            return [];
        }
        let myList = ((connectors[0].type === "group")?this.groups:this.users);
        let children=[];
        for(let connector of connectors){
            for (let item of myList){
                if((item as any).id === connector.childId){
                    children.push(item);
                }
            }
        }
        return children;
    }

    getTree(){
        return Api.getTree()
            .then((tree)=>{
                this.tree = [tree];
                this.onStoreChanged();
                return [tree];
            })
    }

    deleteConnector(groupId:string, childToDelete:{childId:string,type:string}){
        return Api.deleteConnector(groupId,childToDelete)
            .then((deletedChild)=>{
                Api.getGroups()
                    .then((groups)=>{
                        this.groups=groups;
                        this.onStoreChanged();
                    });
                return deletedChild;
            })


    }

    treeShouldUpdate(){
        return appStore.componentTreeShouldUpdate;
    }

    treeUpdated(){
        appStore.componentTreeShouldUpdate = false;
    }

    addMessage(content:string){
        if(!content.replace(/^\s+|\s+$/g,"")){
            return;
        }
        if(!!appStore.selectedGroup) {
            return Api.addMessageToGroup(appStore.selectedGroup,content,appStore.loggedUser)
                .then((newMessage)=>{
                    Api.getGroupMessages(appStore.selectedGroup)
                        .then((messages)=>{
                            this.messages = messages;
                            this.onStoreChanged();
                        })
                    socket.emit("message",newMessage,appStore.chatId);
                    return newMessage;
                })
        }

        else if(appStore.chattingWithUser!=="") {
            return Api.addMessageToUser(appStore.loggedUser,content,appStore.chattingWithUser)
                .then((newMessage)=>{
                    Api.getUserMessages(appStore.loggedUser,appStore.chattingWithUser)
                        .then((messages)=>{
                            this.messages = messages;
                            this.onStoreChanged();
                        })
                    socket.emit("message",newMessage,appStore.chatId);
                    return newMessage;
                })
        }
        // this.onStoreChanged();
    return

    }

    async groupWithUsers(groupId:string,userName:string){
        let children = await this.allChildrenOfGroup(groupId);
        debugger
        if(children.length > 0 && children[0].type === "user"){
            let inGroup = false;
            for (let child of children){
                if(child.name === userName){
                    inGroup = true;
                }
            }
            return inGroup;
        }
        return false;
    }

    async selectGroup(groupId:string,groupName:string){
        if(appStore.loggedUser!==""){
            appStore.chattingWithUser = "";
            if(await this.groupWithUsers(groupId, appStore.loggedUser)){
                if(appStore.chatId!==""){
                    socket.emit("leave-group",appStore.chatId);
                }
                socket.emit("join-group",groupId);
                appStore.chatId = groupId;
                appStore.selectedGroup= groupId;
                this.groupName=groupName;
            }
            else{
                if(appStore.chatId!==""){
                    socket.emit("leave-group",appStore.chatId);
                }
                appStore.selectedGroup= "";
                appStore.chatId = "";
                this.groupName="";
            }
            return Api.getGroupMessages(groupId)
                .then((messages)=>{
                    this.messages = messages;
                    this.onStoreChanged();
                })


        }
        else{
            return;
        }

    }

    editGroup(groupId:string,updates:{field:string,value:any}[]){
        return Api.editGroup(groupId,updates)
            .then((group)=>{
                Api.getGroups()
                    .then((groups)=>{
                        this.groups=groups;
                        this.onStoreChanged();
                    });
                return group;
            })
    }

    userSelected(userName:string,userId:string){
        if(appStore.loggedUser===""){
            return;
        }
        appStore.chattingWithUser = userName;
        appStore.selectedGroup= "";
        if(appStore.chatId!==""){
            socket.emit("leave-group",appStore.chatId);
        }
        appStore.chatId = (userName < appStore.loggedUser?userName+appStore.loggedUser:appStore.loggedUser+userName);
        socket.emit("join-group",appStore.chatId);
        return Api.getUserMessages(appStore.loggedUser,userName)
            .then((messages)=>{
                this.messages = messages;
                this.onStoreChanged();
            })
    }

    getMessages(){
        debugger
        return this.messages;
    }

    getLoggedUser(){
        return appStore.loggedUser;
    }

    getChattedWithUser(){
        return appStore.chattingWithUser;
    }

    getSelectedGroup(){
        return appStore.selectedGroup;
    }

    groupsToDisplay(){
        debugger
        return this.tree;
        // let root = appStore.chat.getGroups().getRoot();
        // if(!!root){
        //     return [root];
        // }
        // else
        //     return [];
    }

    logUser(userName:string){
        appStore.loggedUser=userName;
        this.onStoreChanged();
    }

    async auth(userName:string,password:string){
        let res = await Api.authUser(userName,password)
        let auth = res.authSucess;

        debugger
        return auth;
        // return true;
    }

    logOut(){
        appStore.loggedUser="";
        appStore.selectedGroup="";
        appStore.chattingWithUser="";
        this.messages = [];
        this.onStoreChanged();
    }

    subscribe(listener:Function){
        this.listeners.push(listener);
    }

    private onStoreChanged(){
        for(const listener of this.listeners){
            listener({
                users: this.users,
                groups:this.groups,
                tree:this.tree,
                messages:this.messages,
            });
        }
    }
}

export const appStore: AppState = {
    // chat : new Chat(),
    chatId:"",
    selectedGroup:"",
    loggedUser:"",
    chattingWithUser:"",
    componentTreeShouldUpdate:false,
};

export const appService: AppService = new AppService();
