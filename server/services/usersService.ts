import {Users} from '../models/Users';

const users = new Users();

class UsersService{
    constructor(){

    }

    getUsers = async ()=>{
        const myUsers = await users.allUsers();
        return myUsers;
    }

    addUser = async(body:any)=>{
        const user = await users.addUser(body);
        return user;
    }

    editUser = async(userId:string,updates:{field:string,value:any}[])=>{
        const user = await users.editUser(userId,updates);
        return user;
    }

    deleteUser = async(userId:string)=>{
        const user = await users.removeUser(userId);
        return user;
    }

}

export default UsersService;