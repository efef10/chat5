import {Chat} from '../models/Chat'
// import {Group} from '../models/Group'

// const chat = new Chat()
// import {nAryTree} from '../models/nAryTree';
// const groups = new nAryTree();

class GroupsService{
    private chat:Chat[]
    constructor(){
        this.chat=[];
        this.chat.push(new Chat())
    }

    getGroups= async ()=>{
        const myGroups = await this.chat[0].getGroups().allGroups()/////fixme
        return myGroups;
    }

    addGroup=async (groupId:string,body:any)=>{
        const myGroup = await this.chat[0].getGroups().addGroup(body.name,groupId)/////fixme
        return myGroup;
    }

    editGroup=async(groupId:string,updates:{field:string,value:any}[])=>{
        const myGroup = await this.chat[0].getGroups().editGroup(groupId,updates);
        return myGroup;
    }

    deleteGroup=async (groupId:string)=>{
        const myGroup = await this.chat[0].getGroups().deleteGroup(groupId);
        return myGroup;
    }

    getConnectors=async (groupId:string)=>{
        const myConnectors = await this.chat[0].getGroups().getConnectors(groupId);
        return myConnectors;
    }

    deleteConnector = async(groupId:string,childId:string,type:string)=>{
        const myConnector = await this.chat[0].getGroups().deleteConnector(groupId,childId,type);
        return myConnector;
    }

    addConnector=async(groupId:string,connectorId:string,type:string)=>{
        const myConnector = await this.chat[0].getGroups().addConnector(groupId,connectorId,type);
        return myConnector;
    }

    getTree=async()=>{
        let groups = this.chat[0].getGroups();
        let myTree;
        if(!!groups){
            myTree = await groups.getTree()
        }
        else{
            myTree = [];
        }
        return myTree;
    }

    getMessages=async(groupId:string)=>{
        const messages = await this.chat[0].getGroups().getMessages(groupId);
        return messages;
    }

    addMessage=async(groupId:string,content:string,fromUser:string,date:Date)=>{
        const newMessage = await this.chat[0].getGroups().addMessage(groupId,content,fromUser,date);
        return newMessage;
    }
}

export default GroupsService;