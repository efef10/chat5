import * as React from 'react';
import {Link} from 'react-router-dom';
import './DisplayList.css';
import {appService} from "../models/AppStore";
// import CreateUser from './CreateUser'
// interface IItem{
//     name:string,
//     id:number
// }

interface IDisplayListProps{
    list:any;
    deleteData(objId:number,item?:string):void
    type:string
    groupId?:number
}

interface IDisplayListState{
    currentChildren:any[],
    list:any[],
}

class DisplayList extends React.Component<IDisplayListProps,IDisplayListState>{
    constructor(props:any){
        super(props);
        this.state={currentChildren:[],
                    list:this.props.list}
    }

    // componentDidMount() {
    //     if (!!this.props.groupId) {
    //     appService.allUsersOfGroup(this.props.groupId).then((children) => {
    //         this.setState({currentChildren: children});
    //         // this.children = children;
    //     })
    // }
    // }

    componentWillReceiveProps(props:IDisplayListProps){
        this.setState({list:[...props.list]})
    }

    deleteData=(e:any, item:any)=>{
        let children = this.state.list.filter((child)=>{
            child.id!==item.id;
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

    render(){
        debugger
        const list = this.state.list.map((item:any,idx:any)=>{
            return (
                <li key={idx}>
                        <div className="wrapper">

                            <img src="https://avatars0.githubusercontent.com/u/34084309?s=40&v=4" alt=""/>
                            <p>{item.name}</p>
                            <p>{item.id}</p>
                            {(this.props.type!=="children")?
                                (<Link to={{pathname:`/${this.state.list[0].type === "user"?'users':'groups'}/${item.id}`,state:{object:item,children:this.state.currentChildren}}}>
                                    <button className="listBtn" onMouseOver={(e)=>{this.calcChildren(e,item)}}>Edit ></button>
                                </Link>):
                                <></>}
                            <button className="listBtn" onClick={(e)=>{this.deleteData(e,item)}}>Delete</button>
                        </div>
                    </li>
            )
        })
        return (
            <div className="displayList">
                {(this.props.type === "users" || this.props.type === "groups")?
                    (<Link to={`${this.props.type}/new`}>
                        <button>create new {this.props.type === "users" ? "user" : "group"}</button>
                    </Link>):
                    (<>
                        <button>add user to this group</button>
                        <button>add group to this group</button>
                        <input type="text" placeholder="New Group Name"/>
                     </>)
                }
                <ul>{list}</ul>
            </div>
        )
    }
}

export default DisplayList;