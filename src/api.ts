// import {appStore} from "./models/AppStore";

export class Api{
    static baseURL:string = "http://localhost:4000";

    static getUsers(){
        return this.get('/users');
    }

    static addUser(user:object){
        return this.post('/users/',user);
    }


    static deleteUser(userId:string){
        return this.delete(`/users/${userId}`,{type:"user"});
    }

    static editUser(userId:string,updates:{field:string,value:any}[]){
        return this.put('/users/'+userId,{updates});
    }

    /////////////////////////////////////////////

    static getGroups(){
        return this.get('/groups');
    }

    static addGroup(groupName:string,toGroupID:string){
        return this.post('/groups/'+toGroupID,{name:groupName,type:"group"});
    }

    static deleteGroup(groupId:string){
        return this.delete(`/groups/${groupId}`,{type:"group"});
    }

    static getConnectors(groupId:string){
        return this.get(`/groups/${groupId}/connectors`);
    }

    static deleteConnector(groupId:string,childToDelete:{childId:string,type:string}){
        return this.delete(`/groups/${groupId}/connectors/${childToDelete.childId}`,{type:childToDelete.type});
    }

    static addConnector(connectorId:string,toGroupID:string,type:string){
        return this.post(`/groups/${toGroupID}/connectors`,{connectorId:connectorId,type:type});
    }

    static getTree(){
        return this.get('/groups/tree');
    }

    static getGroupMessages(groupId:string){
        return this.get(`/groups/${groupId}/messages`);
    }

    static getUserMessages(userName:string,chattingWith:string){
        return this.get(`/users/${userName}/messages/${chattingWith}`);
    }

    static addMessageToGroup(groupId:string,content:string,fromUser:string){
        return this.post(`/groups/${groupId}/messages`,{content,fromUser})
    }

    static addMessageToUser(userName:string,content:string,toUser:string){
        return this.post(`/users/${userName}/messages`,{content,toUser})
    }

    static authUser(userName:string,password:string){
        return this.post(`/users/${userName}/login`,{password})
    }

    static editGroup(groupId:string,updates:{field:string,value:any}[]){
        return this.put(`/groups/${groupId}`,{updates})
    }

    static get(url:string){
        return fetch(Api.baseURL + url,{
            method:"GET"
        })
            .then(res=>res.json())
    }

    static post(url:string,body:object){
        return fetch(Api.baseURL + url,{
            method:"POST",
            body:JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(res=>res.json())
    }

    static put(url:string,body:object){
        return fetch(Api.baseURL + url,{
            method:"PUT",
            body:JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(res=>res.json())
    }

    static delete(url:string,body:{type:string}){
        return fetch(Api.baseURL + url,{
            method:"DELETE",
            // body:JSON.stringify(body||""),
            body:JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
    }
}