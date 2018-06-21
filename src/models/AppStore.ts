// import {listeners} from "cluster";
import {Group} from './Group';
import {Chat} from './Chat';

import {Api} from '../../src/api'
// import {IMessage} from './Group';


// interface observer{
//     type:string,
//     listeners: Function[];
// }


export interface AppState {
    chat : Chat
    selectedGroup:Group|null;
    loggedUser:string;
    chattingWithUser:string;
    componentTreeShouldUpdate:boolean;
}

export class AppService {
    listeners: Function[];
    users: object[];
    groups: object[];
    // selectedGroup:Group|null;
    // loggedUser:string;
    // chattingWithUser:string;
    // users: User[];


    constructor(){
        this.listeners = [];
        this.users=[];
        this.groups=[];
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
        debugger
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
                return user;
            })
    }

    addGroup(groupName:string,toGroupID:string){
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

    async allUsersOfGroup(groupId:string){
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
            appStore.selectedGroup.addMessage(
                {content:  content,
                    date:     new Date(),
                    userName: appStore.loggedUser});
            // auto reply:
            appStore.selectedGroup.addMessage(
                {content:  "what do you say???",
                    date:     new Date(),
                    userName: "bambi"});
        }
        else if(appStore.chattingWithUser!=="") {
            let user = appStore.chat.returnUserByName(appStore.loggedUser);
            let chattingWith =  appStore.chat.returnUserByName(appStore.chattingWithUser);
            if(!!user && !!chattingWith) {
                user.addMessage(
                    {content: content,
                        date: new Date(),
                        userName: appStore.loggedUser,
                        chattingWithUser:appStore.chattingWithUser});

                // auto reply:
                chattingWith.addMessage(
                    {content: appStore.loggedUser === appStore.chattingWithUser ? "I'm your virtual Psychologist. \n can I help you?":`hi ${appStore.loggedUser} !!! we haven't talk for a long time`,
                        date: new Date(),
                        userName: appStore.chattingWithUser,
                        chattingWithUser:appStore.loggedUser})
            }
        }
        this.onStoreChanged();
    }

    selectGroup(path:string){
        appStore.chattingWithUser = "";
        let group = appStore.chat.getGroupByPath(path);
        if(appStore.loggedUser!=="" && !!group && group.userInGroup(appStore.loggedUser) ){
            appStore.selectedGroup= group;
        }
        else{
            appStore.selectedGroup=null;
        }
        this.onStoreChanged();
    }

    userSelected(userName:string){
        if(appStore.loggedUser===""){
            return;
        }
        appStore.chattingWithUser = userName;
        appStore.selectedGroup = null;
        this.onStoreChanged();
    }

    getMessages(){
        if(!!appStore.selectedGroup){
            return appStore.selectedGroup.getMessages();
        }
        else if(appStore.chattingWithUser!=="" && appStore.loggedUser!==""){
            let user = appStore.chat.returnUserByName(appStore.loggedUser);
            let chattingWith =  appStore.chat.returnUserByName(appStore.chattingWithUser);
            if(!!user && !!chattingWith){
                let allMessages =  user.getUserMessages(appStore.chattingWithUser).concat
                (appStore.loggedUser !==appStore.chattingWithUser ?chattingWith.getUserMessages(appStore.loggedUser):[]);
                return allMessages.sort((message1:any,message2:any)=>{
                    return message1.date-message2.date;
                })
            }
            else{
                return []
            }
        }
        else{
            return [];
        }
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
        let root = appStore.chat.getGroups().getRoot();
        if(!!root){
            return [root];
        }
        else
            return [];
    }

    logUser(userName:string){
        appStore.loggedUser=userName;
        this.onStoreChanged();
    }

    auth(userName:string,password:string){
        let user =  appStore.chat.returnUserByName(userName);
        if(!!user){
            return user.getPassword()===password;
        }
        return false;

    }

    logOut(){
        appStore.loggedUser="";
        appStore.selectedGroup=null;
        appStore.chattingWithUser="";
        this.onStoreChanged();
    }

    subscribe(listener:Function){
        this.listeners.push(listener);
    }

    private onStoreChanged(){
        for(const listener of this.listeners){
            listener({
                users: this.users,
                groups:this.groups
            });
        }
    }
}

export const appStore: AppState = {
    chat : new Chat(),
    selectedGroup:null,
    loggedUser:"",
    chattingWithUser:"",
    componentTreeShouldUpdate:false,
};

export const appService: AppService = new AppService();
