export {};

// import {IMessage} from './Group';

interface IUserMessage{
    content:string
    date:Date
    userName:string
    chattingWithUser:string
}

interface IUser{
    getUserName():string
    getAge():number
    setAge(age:number):boolean
    getPassword():string
    setPassword(password:string):void
    getType():string
    getUserMessages(chattingWith:string):IUserMessage[]
    getProfileImg():string
}

export class User implements IUser{
    private type:string;
    private name:string;
    private age:number;
    private password:string;
    private profileImg:string;
    private messages:IUserMessage[];

    constructor(userName:string, age:number, password:string, profileImg?:string){
        this.type = "user";
        this.name = userName;
        this.age = age;
        this.password = password;
        this.profileImg = profileImg?profileImg:'blank.png';
        this.messages=[];
    }

    public getProfileImg(){
        return this.profileImg;
    }

    public getType() {
        return this.type;
    }
    public getUserName() {
        return this.name;
    }
    public getAge(){
        return this.age;
    }
    public setAge(age:number){
        this.age = age;
        return true;
    }
    public getPassword() {
        return this.password;
    }
    public setPassword(password:string) {
        this.password = password;
    }
    public getUserMessages(chattingWith:string){
        return this.messages.filter((message)=>{
            return message.chattingWithUser === chattingWith;
        });
    }
    public addMessage(message:IUserMessage){
        // let messagesOfChatted = this.messages.filter((myMessage)=> {
        //     return myMessage.chattingWithUser === message.chattingWithUser
        // })
        // if(messagesOfChatted.length === 0) {
        //     this.messages.push(message);
        //     return;
        // }
        //
        // let lastMessage = this.messages[this.messages.length-1];
        // if(lastMessage.chattingWithUser===message.chattingWithUser){
        //     lastMessage.content += ('\n'+  message.content);//lastMessage.content.concat('\n' + '\n' + message.content)
        //     lastMessage.date = message.date;
        // }
        // else{
            this.messages.push(message);
        // }
    }
}

// module.exports.User = User;