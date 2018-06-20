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

    addGroup=async (groupId:number,body:any)=>{
        const myGroup = await this.chat[0].getGroups().addGroup(body.name,groupId)/////fixme
        return myGroup;
    }

    editGroup=async(groupId:number,body:{name:string,type:string})=>{
        const myGroup = await this.chat[0].getGroups().addGroup(body.name,groupId);
        return myGroup;
    }

    deleteGroup=async (groupId:number)=>{
        const myGroup = await this.chat[0].getGroups().deleteGroup(groupId);
        return myGroup;
    }

    getConnectors=async (groupId:number)=>{
        const myConnectors = await this.chat[0].getGroups().getConnectors(groupId);
        return myConnectors;
    }

    deleteConnector = async(groupId:number,childId:number,type:string)=>{
        const myConnector = await this.chat[0].getGroups().deleteConnector(groupId,childId,type);
        return myConnector;
    }
}

export default GroupsService;