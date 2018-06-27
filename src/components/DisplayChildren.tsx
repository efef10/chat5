import * as React from 'react';
// import {Link} from 'react-router-dom';
import './DisplayChildren.css';
import {appService} from "../models/AppStore";
// import CreateUser from './CreateUser'
// interface IItem{
//     name:string,
//     id:number
// }

interface IDisplayChildrenProps{
    list:any;
    deleteData(objId:string,item?:string):void
    type:string
    users:any[]
    addGroup(groupName:string):void
    groupId?:string
    addUserToGroup(userId:string):void
    usersToAdd():void
}

interface IDisplayChildrenState{
    currentChildren:any[],
    list:any[],
}

class DisplayChildren extends React.Component<IDisplayChildrenProps,IDisplayChildrenState>{
    private groupName:any;
    private selectUser:any;

    constructor(props:any){
        super(props);
        this.state={currentChildren:[],
            list:this.props.list}
    }


    // componentDidMount(){
    //     this.props.usersToAdd();
    // }

    componentWillReceiveProps(props:IDisplayChildrenProps){
        console.log(">>>>>>>>>>>>>PROPS", props.list);
        // if(this.state.list !== props.list){
            this.setState({list:props.list})
        // }
    }

    deleteData=async (e:any, item:any)=>{
        await this.props.deleteData(item.id,item.type);
        // this.props.usersToAdd();
        // const children = await this.calcChildren(e,item)
        // this.setState({list: children})

    }

    calcChildren=(e:any,item:any)=>{
        return appService.allChildrenOfGroup(item.id);
    }

    submit = ()=>{
        this.props.addGroup(this.groupName.value);
        this.groupName.value="";
    }

    addUser = async()=>{
        const selected = this.selectUser.options[this.selectUser.selectedIndex];
        await this.props.addUserToGroup(selected.value);
        // await this.props.usersToAdd();
    }

    render(){
        const list = this.state.list.map((item:any,idx:any)=>{
            return (
                <li key={idx}>
                    <div className="wrapper">

                        <img src="https://avatars0.githubusercontent.com/u/34084309?s=40&v=4" alt=""/>
                        <p>{item.name}</p>
                        <p>{item.id}</p>
                        {/*<Link to={{pathname:`/${this.state.list[0].type === "user"?'users':'groups'}/${item.id}`,state:{object:item,children:this.state.currentChildren}}}>*/}
                            {/*<button className="listBtn" onMouseOver={(e)=>{this.calcChildren(e,item)}}>Edit ></button>*/}
                        {/*</Link>*/}
                        <button className="listBtn" onClick={(e)=>{this.deleteData(e,item)}}>Delete</button>
                    </div>
                </li>
            )
        })

        let options = this.props.users.map((user:any,idx:any)=>{
            return (
                <option key={idx} value={user.id}>{"-- "+user.name}</option>
            )
        })

        return (
            <div className="displayChildren">
                <div className="editingChildren">
                    <button onClick={this.addUser}>add user to this group</button>
                    <select name="selectUser" id="selectedGroup" ref={elem=>this.selectUser = elem}>
                        {options}
                    </select>
                    <button onClick={this.submit}>add group to this group</button>
                    <input ref={elem=>this.groupName = elem} name="groupName" type="text" placeholder="New Group Name"/>
                </div>
                <ul>{list}</ul>
            </div>
        )
    }
}

export default DisplayChildren;