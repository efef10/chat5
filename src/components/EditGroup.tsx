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
    groupId:number,
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
        this.setState({list:[...props.list]});
    }


    deleteData=(childId:number,childType:string)=>{
        appService.deleteConnector(this.state.groupId,{childId:childId,type:childType});
        let tmpList = [...this.state.list];
        let newList = tmpList.filter((item)=>{
            item.id !== childId
        })
        this.setState({list:newList});
    }

    addGroup=(groupName:string)=>{
        appService.addGroup(groupName,this.state.groupId);
    }

    submit=()=>{
        // const username = this.props.location.state.object.name;
        // const id = this.props.location.state.object.id;
        // appService.editUser({type:"user",id:id,name:username, age:this.state.age,password:this.state.password})
    }

    render(){
        return (
            <>
                <p>Edit Group: {this.props.location.state.object.id} {this.props.location.state.object.name}</p>

                <div>
                    <label>Group Name:</label>
                    <input type="text" value={this.state.groupName} onChange={this.groupNameChanged} placeholder="Group Name"/>
                </div>
                <input type="submit" onClick={this.submit} value="save"/>
                <DisplayChildren addGroup={this.addGroup} users={this.props.users} type="children" list={this.state.list} deleteData={this.deleteData} groupId={this.state.groupId}/>


            </>
        )
    }
}

export default EditGroup;