import * as React from 'react';
import {appService} from "../models/AppStore";
import './Send.css';

class Send extends React.Component{
    private input:any
    constructor(props:any){
        super(props);
    }

    public addMessage =(e:any)=>{
        appService.addMessage(e.target.previousSibling.value);
        this.input.value="";
    }

    public render(){
        return(
            <div className='send'>
                <input ref={elem=>this.input = elem} id="message" type="text" placeholder='enter message' disabled={appService.getSelectedGroup()||appService.getChattedWithUser()!==""?false:true}/>
                <button onClick={this.addMessage} disabled={appService.getSelectedGroup()||appService.getChattedWithUser()!==""?false:true}>{'>'}</button>
            </div>
        );
    }
}

export default Send;