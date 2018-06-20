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

    editUser = async(userId:number,body:any)=>{
        const user = await users.editUser(userId,body);
        return user;
    }

    deleteUser = async(userId:number)=>{
        const user = await users.removeUser(userId);
        return user;
    }

}

export default UsersService;