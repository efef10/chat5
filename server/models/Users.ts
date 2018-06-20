import {DB} from '../lib/db';

const usersDB = new DB("users");


export {};

// const User    = require('./User.ts').User;
import {User} from './User';

interface IUsers{
    addUser(userName:string, age:number, password:string):void,
    removeUser(userId:number):void,
    setUserAge(userName:string, newAge:number):boolean,
    setUserPassword(userName:string, newPassword:string):boolean,
    returnUserByName(userName:string):User|null,
    allUsersNames():string[],
    // allUsers():Promise<any>
    deleteAllUsers():void
}

export class Users implements IUsers{
    private users:User[];

    constructor(users?:User[]){
        this.users = users || [];
    }

    public async addUser(body:any){
        body.type = "user";
        body.message = [];
        let data = await usersDB.getData();
        if (!data){
            await usersDB.initiate();
        }
        // let newId = data.length;
        body.id= new Date().getUTCMilliseconds();
        let user = await usersDB.addData(body);
        return user;
        // this.users.push(new User(userName, age, password,profileImg));
    }

    public deleteAllUsers(){
         usersDB.deleteFileContent();
        // return status;
    }

    public editUser(userId:number,body:any){
        return usersDB.editData(userId,body);
        // usersDB.getData().then((users)=>{
        //     for(let user of users){
        //
        //     }
        // });
    }

    public removeUser(userId:number){
        return usersDB.deleteData(userId,"id");

        // var user = this.returnUserByName(userName)
        // if(user!==null){
        //     var index = this.users.indexOf(user);
        //     this.users.splice(index,1);
        // }
        // user.removeUserEvent.fire(userName);
    }

    //////////////////////////////////////////////////////////////////////



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

    public async allUsers(){
        let data = await usersDB.getData();
        if(!!data){
            // this.users = data;
            return data;
        }
        else{
            return [];
        }

    }
}


// module.exports.Users = Users;