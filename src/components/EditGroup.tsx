import * as React from 'react';
import {appService} from "../models/AppStore";
// import DisplayList from "./DisplayList";
import DisplayChildren from "./DisplayChildren";

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

}

class EditGroup extends React.Component<IEditProps,IEditState>{
    constructor(props:IEditProps){
        super(props);
        this.state={groupName:this.props.location.state.object.groupName,
                    groupId:this.props.location.state.object.id,
                    list:this.props.list}
    }

    groupNameChanged=(e:any)=>{
        this.setState({groupName:e.target.value});
    }


    componentWillReceiveProps(props:IEditProps){
        if(this.state.list!==props.list){
            // this.setState({list:[...props.list]});
            this.setState({
                groupId:this.props.location.state.object.id,
                groupName:this.props.location.state.object.name},async ()=>{
                let children = await appService.allChildrenOfGroup(this.props.location.state.object.id);
                debugger
                this.setState({list:children});
            });
        }
    }

    deleteData=async(childId:string,childType:string)=>{
        await appService.deleteConnector(this.state.groupId,{childId:childId,type:childType});
        let children = await appService.allChildrenOfGroup(this.state.groupId);
        this.setState({list:children})
    }

    addGroup=async(groupName:string)=>{
        await appService.addGroup(groupName,this.state.groupId);
        let children = await appService.allChildrenOfGroup(this.state.groupId);
        this.setState({list:children})
    }

    submit=()=>{
        // const username = this.props.location.state.object.name;
        // const id = this.props.location.state.object.id;
        // appService.editUser({type:"user",id:id,name:username, age:this.state.age,password:this.state.password})
    }

     addUserToGroup=async(userId:string)=>{
        await appService.addUserToGroup(userId,this.state.groupId);
        let children = await appService.allChildrenOfGroup(this.state.groupId);
        this.setState({list:children})
    }

    render(){
        return (
            <>
                {/*<p>Edit Group: {this.props.location.state.object.id} {this.props.location.state.object.name}</p>*/}
                <p>Edit Group: {this.props.location.state.object.id} {this.props.location.state.object.name}</p>

                <div>
                    <label>Group Name:</label>
                    <input type="text" value={this.state.groupName} onChange={this.groupNameChanged} placeholder="Group Name"/>
                </div>
                <input type="submit" onClick={this.submit} value="save"/>
                <DisplayChildren addUserToGroup={this.addUserToGroup} addGroup={this.addGroup} users={this.props.users} type="children" list={this.state.list} deleteData={this.deleteData} groupId={this.state.groupId}/>


            </>
        )
    }
}

export default EditGroup;