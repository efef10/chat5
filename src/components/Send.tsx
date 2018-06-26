import * as React from 'react';
import {appService} from "../models/AppStore";
import './Send.css';

interface ISendProps{
    addMessage(msg:string):void
}



class Send extends React.Component<ISendProps,{}>{
    private input:any
    constructor(props:ISendProps){
        super(props);
    }

    public addMessage =(e:any)=>{
        this.props.addMessage(e.target.previousSibling.value);
        this.input.value="";
    }

    public render(){
        return(
            <div className='send'>
                <input ref={elem=>this.input = elem} id="message" type="text" placeholder='enter message' disabled={appService.getSelectedGroup()!==""||appService.getChattedWithUser()!==""?false:true}/>
                <button onClick={this.addMessage} disabled={appService.getSelectedGroup()!==""||appService.getChattedWithUser()!==""?false:true}>{'>'}</button>
            </div>
        );
    }
}

export default Send;