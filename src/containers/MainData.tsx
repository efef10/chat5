import * as React from "react";
import DataFlow from './DataFlow';
import {Group} from '../models/Group';
import TreeComponent from '../components/TreeComponent';
import {appService} from "../models/AppStore";
import {IMessage} from '../models/Group';
// import {Redirect} from 'react-router-dom';
// import Popup from '../components/PopUp';

interface IMainDataProps{
    groups:Group[],
    messages:IMessage[]
}

interface IMainDataState{
    messages:IMessage[]
}

class MainData extends React.Component<IMainDataProps,IMainDataState>{

    constructor(props:IMainDataProps){
        super(props);
        this.state={messages:[]}
        appService.subscribe((data:{groups:object[],users:object[],tree:Group[],messages:IMessage[]})=>{
            if(data.users!==this.state.messages){
                this.setState({
                    messages:data.messages
                });
            }
        })
        // this.state = {group:null}
    }

    // public renderLogIn=(props:any)=>
    // return appService.getLoggedUser()===""?<Popup {...props} />:<Redirect to={{pathname:"/"}}/>}

    public render(){
        return(
            <div className='main'>
                <div className='treeComponent'>
                    <TreeComponent groups={this.props.groups}/>
                </div>
                <div className='window'>
                    {/*<DataFlow  messages={[]}/>*/}
                    {/*<DataFlow messages={appService.getMessages()}/>*/}
                    <DataFlow messages={this.props.messages}/>
                </div>
            </div>
        )
    }
}


export default MainData;