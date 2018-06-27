import * as React from 'react';
import {appService} from "../models/AppStore";
import DisplayChildren from "./DisplayChildren";
import './EditGroup.css'

interface IEditProps{
    match:any,
    location:any,
    history:any,
    list:any[],
    users:any[]
}

interface IEditState{
    groupName:string,
    groupId:string,
    list:any[],
    usersToAdd:any[],

}

class EditGroup extends React.Component<IEditProps,IEditState>{
    constructor(props:IEditProps){
        super(props);
        this.state={groupName:this.props.location.state.object.groupName,
                    groupId:this.props.location.state.object.id,
                    list:this.props.list,
                    usersToAdd:[]}
    }

    groupNameChanged=(e:any)=>{
        this.setState({groupName:e.target.value});
    };

    async componentDidMount(){
        await this.usersToAdd();
        this.setState({groupName:this.props.location.state.object.name});
    }

    componentWillReceiveProps(props:IEditProps){
        if(this.state.list!==props.list){
            // this.setState({list:[...props.list]});
            this.setState({
                groupId:this.props.location.state.object.id,
                groupName:this.props.location.state.object.name},async ()=>{
                let children = await appService.allChildrenOfGroup(this.props.location.state.object.id);
                debugger;
                this.setState({list:children});
            });
        }
    }

    deleteData=async(childId:string,childType:string)=>{
        await appService.deleteConnector(this.state.groupId,{childId:childId,type:childType});
        let children = await appService.allChildrenOfGroup(this.state.groupId);
        this.setState({list:children});
        this.usersToAdd();
    };

    addGroup=async(groupName:string)=>{
        await appService.addGroup(groupName,this.state.groupId);
        let children = await appService.allChildrenOfGroup(this.state.groupId);
        this.setState({list:children});
        this.usersToAdd();
    };

    submit=()=>{
        appService.editGroup(this.state.groupId,[{field:"name",value:this.state.groupName}]);
    };

    addUserToGroup=async(userId:string)=>{
        await appService.addUserToGroup(userId,this.state.groupId);
        let children = await appService.allChildrenOfGroup(this.state.groupId);
        this.setState({list:children});
        this.usersToAdd();
    };

    usersToAdd=async()=>{
        let children = await appService.allChildrenOfGroup(this.state.groupId);
        debugger;
        let remainingUsers = this.props.users.filter((user)=>{
            let inConditions = true;
            if(children.length === 0){
                inConditions = true;
            }
            for(let child of children){
                if(child.type === "user" && child.id === user.id){
                    inConditions = false;
                }
            }
            return inConditions;
        });
        debugger;
        this.setState({usersToAdd:remainingUsers})
    };

    render(){
        return (
            <div className="editGroup">
                <p>Edit Group: {this.props.location.state.object.id}</p>
                <div>
                    <label>Group Name:</label>
                    <input type="text" value={this.state.groupName} onChange={this.groupNameChanged} placeholder="Group Name"/>
                    <input type="submit" onClick={this.submit} value="save"/>
                </div>

                <DisplayChildren usersToAdd={this.usersToAdd} addUserToGroup={this.addUserToGroup} addGroup={this.addGroup} users={this.state.usersToAdd} type="children" list={this.state.list} deleteData={this.deleteData} groupId={this.state.groupId}/>
            </div>
        )
    }
}

export default EditGroup;