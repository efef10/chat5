import * as React from 'react';
import {Link} from 'react-router-dom';
import './DisplayChildren.css';
import {appService} from "../models/AppStore";
// import CreateUser from './CreateUser'
// interface IItem{
//     name:string,
//     id:number
// }

interface IDisplayChildrenProps{
    list:any;
    deleteData(objId:number,item?:string):void
    type:string
    users:any[]
    addGroup(groupName:string):void
    groupId?:number
}

interface IDisplayChildrenState{
    currentChildren:any[],
    list:any[],
}

class DisplayChildren extends React.Component<IDisplayChildrenProps,IDisplayChildrenState>{
    private groupName:any

    constructor(props:any){
        super(props);
        this.state={currentChildren:[],
            list:this.props.list}
    }


    // componentWillReceiveProps(props:IDisplayChildrenProps){
    //     this.setState({list:[...props.list]})
    // }

    deleteData=(e:any, item:any)=>{
        let children = this.state.list.filter((child)=>{
            return child.id!==item.id;
        })
        debugger;
        this.setState({list:children})
        this.props.deleteData(item.id,item.type)
    }

    calcChildren=(e:any,item:any)=>{
        appService.allUsersOfGroup(Number(item.id)).then((children)=>{
            this.setState({currentChildren:children});
        })
    }

    submit = ()=>{
        // const groupName = e.target.elements.groupName.value;
        this.props.addGroup(this.groupName);
        // const selectWrapper = e.target.elements.selectedGroup;
        // const selected = selectWrapper.options[selectWrapper.selectedIndex];
        // // console.log(selected.value);
        // appService.addGroup(groupName,Number(selected.value));
    }

    render(){
        const list = this.state.list.map((item:any,idx:any)=>{
            return (
                <li key={idx}>
                    <div className="wrapper">

                        <img src="https://avatars0.githubusercontent.com/u/34084309?s=40&v=4" alt=""/>
                        <p>{item.name}</p>
                        <p>{item.id}</p>
                        <Link to={{pathname:`/${this.state.list[0].type === "user"?'users':'groups'}/${item.id}`,state:{object:item,children:this.state.currentChildren}}}>
                            <button className="listBtn" onMouseOver={(e)=>{this.calcChildren(e,item)}}>Edit ></button>
                        </Link>
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
                <>
                    <button>add user to this group</button>
                    <select name="selectedGroup" id="selectedGroup">
                        {options}
                    </select>
                    <button onClick={this.submit}>add group to this group</button>
                    <input ref={elem=>this.groupName = elem} name="groupName" type="text" placeholder="New Group Name"/>
                </>
                <ul>{list}</ul>
            </div>
        )
    }
}

export default DisplayChildren;