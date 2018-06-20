export class Api{
    static baseURL:string = "http://localhost:4000";

    static getUsers(){
        return this.get('/users');
    }

    static addUser(user:object){
        return this.post('/users/',user);
    }


    static deleteUser(userId:number){
        return this.delete(`/users/${userId}`,{type:"user"});
    }

    static editUser(user:any){
        debugger
        return this.put('/users/'+user.id,user);
    }

    /////////////////////////////////////////////

    static getGroups(){
        return this.get('/groups');
    }

    static addGroup(groupName:string,toGroupID:number){
        return this.post('/groups/'+toGroupID,{name:groupName,type:"group"});
    }

    static deleteGroup(groupId:number){
        return this.delete(`/groups/${groupId}`,{type:"group"});
    }

    static getConnectors(groupId:number){
        return this.get(`/groups/${groupId}/connectors`);
    }

    static deleteConnector(groupId:number,childToDelete:{childId:number,type:string}){
        return this.delete(`/groups/${groupId}/connectors/${childToDelete.childId}`,{type:childToDelete.type});
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