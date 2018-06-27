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

    addMessageToUser = async(userId:string,content:string,toUser:string)=>{
        const message = await users.addMessage(userId,{content,date:new Date(),toUser});
        return message;
    }

    getUserMessages = async(userName:string,chattingWith:string)=>{
        const messages = await users.getUserMessages(userName,chattingWith);
        return messages;
    }

    authUser = async(userName:string,password:string)=>{
        const authSuccess = await users.authUser(userName,password);
        return authSuccess;
    }

}

export default UsersService;