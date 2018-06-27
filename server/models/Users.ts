import {DB} from '../lib/db';
import * as uniqid from 'uniqid';

const usersDB = new DB("users");
const messagesDB = new DB("messages");
const connectorsDB = new DB("connectors")

export {};

// const User    = require('./User.ts').User;
import {User} from './User';

interface IUsers{
    addUser(userName:string, age:number, password:string):void,
    removeUser(userId:string):void,
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
        for (let user of data){
            if(user.name === body.name){
                return false
            }
        }
        body.id= uniqid();
        let user = await usersDB.addData(body);
        return user;
        // this.users.push(new User(userName, age, password,profileImg));
    }

    public deleteAllUsers(){
         usersDB.deleteFileContent();
        // return status;
    }

    public editUser(userId:string,updates:{field:string,value:any}[]){
        return usersDB.editData([{"field":"id","value":userId}],updates);
    }

    public async removeUser(userId:string){
        await connectorsDB.deleteData([{field:"type",value:"user"},{field:"childId",value:userId}])
        return await usersDB.deleteData([{"field":"id","value":userId}]);
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

    public async addMessage(userName:string,message:{content:string,toUser:string,date:Date}){
        const users = await usersDB.getData();
        let writerId;
        let toId;
        for(let user of users){
            if(user.name === userName){
                writerId=user.id;
            }
            if(user.name === message.toUser){
                toId = user.id;
            }
        }


        let newMessage = {userName,writerId,type:"user",to:toId,content:message.content,date:message.date};
        let myMessage =  await messagesDB.addData(newMessage);
        return myMessage;
    }

    public async authUser(userName:string,password:string){
        const users = await usersDB.getData();
        for(let user of users){
            if(user.password === password){
                return true;
            }
        }
        return false;
    }

    public async getUserMessages(userName:string,chattingWith:string){
        const users = await usersDB.getData();
        let writerId;
        let toId;
        for(let user of users){
            if(user.name === userName){
                writerId=user.id;
            }
            if(user.name === chattingWith){
                toId = user.id;
            }
        }
        if(writerId && toId){
            // let messages = await messagesDB.getData([{field:"to",value:toId},
            //                                                  {field:"writerId",value:writerId},
            //                                                  {field:"type",value:"user"}]);

            let messages = await messagesDB.getData();
            let myMessages = [];
            for(let message of messages){
                if(message.type === "user"){
                    if((message.writerId === writerId && message.to) === toId || (message.to === writerId && message.writerId)){
                        myMessages.push(message);
                    }
                }
            }
            return myMessages;
        }
        return [];
    }
}



// module.exports.Users = Users;