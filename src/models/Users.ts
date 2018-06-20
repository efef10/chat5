export {};

// const User    = require('./User.ts').User;
import {User} from './User';

interface IUsers{
    addUser(userName:string, age:number, password:string):void,
    removeUser(userName:string):void,
    setUserAge(userName:string, newAge:number):boolean,
    setUserPassword(userName:string, newPassword:string):boolean,
    returnUserByName(userName:string):User|null,
    allUsersNames():string[],
    allUsers():User[]
}

export class Users implements IUsers{
    private users:User[];

    constructor(users?:User[]){
        this.users = users || [];
    }

    public addUser(userName:string, age:number, password:string, profileImg?:string){
        this.users.push(new User(userName, age, password,profileImg));
    }

    public removeUser(userName:string){
        var user = this.returnUserByName(userName)
        if(user!==null){
            var index = this.users.indexOf(user);
            this.users.splice(index,1);
        }
        // user.removeUserEvent.fire(userName);
    }

    public setUserAge(userName:string, newAge:number){
        let user = this.returnUserByName(userName);
        if(!!user){
            user.setAge(newAge);
            return true;
        }
        return false;
    }

    public setUserPassword(userName:string, newPassword:string){
        let user = this.returnUserByName(userName);
        if(!!user){
            user.setPassword(newPassword);
            return true;
        }
        return false;
    }

    public returnUserByName(userName:string){
        if(!!userName){
            for(var i=0; i<this.users.length ; i++){
                if(this.users[i].getUserName() === userName){
                    return this.users[i];
                }
            }
            return null;
        }
        return null;
    }

    public allUsersNames(){
        return this.users.map( user => user.getUserName())
    }

    public allUsers(){
        return this.users;
    }
}


// module.exports.Users = Users;