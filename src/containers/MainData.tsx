import * as React from "react";
import DataFlow from './DataFlow';
import TreeComponent from '../components/TreeComponent';
import {appService} from "../models/AppStore";
// import {Redirect} from 'react-router-dom';
// import Popup from '../components/PopUp';

interface IMainDataProps{
    groups:object[]
}

class MainData extends React.Component<IMainDataProps,{}>{

    constructor(props:IMainDataProps){
        super(props);
    }

    // public renderLogIn=(props:any)=>
    // {debugger;
    // return appService.getLoggedUser()===""?<Popup {...props} />:<Redirect to={{pathname:"/"}}/>}

    public render(){
        return(
            <div className='main'>
                <div className='treeComponent'>
                    <TreeComponent groups={this.props.groups}/>
                </div>
                <div className='window'>
                    <DataFlow messages={appService.getMessages()}/>
                </div>
            </div>
        )
    }
}


export default MainData;