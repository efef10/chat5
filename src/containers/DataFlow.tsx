import * as React from 'react';
import Send from '../components/Send';
import History from './History';
import {IMessage} from '../models/Group';
import * as io from 'socket.io-client';
import {appService} from "../models/AppStore";
const socket = io.connect("http://localhost:4000");

// socket.on('message', (msg:string)=>{
//     let newMessage = {content:msg,date:new Date(),userName:"user fixme"}
//     this.setState({messages:this.state.messages.concat([newMessage])})
// });

interface IDataFlowProps{
    messages:IMessage[],
}

interface IDataFlowState{
    messages:IMessage[],
}


class DataFlow extends React.Component<IDataFlowProps,IDataFlowState>{
    constructor(props:IDataFlowProps){
        super(props);
        this.state={messages:this.props.messages}
    }

    addMessage=(msg:string)=>{
        appService.addMessage(msg);
        socket.emit("message",msg);

    }

    public render(){
        return(
            <div className='dataFlow'>
                <History messages={this.props.messages}/>
                {/*<History messages={this.state.messages}/>*/}
                <Send addMessage={this.addMessage}/>
            </div>
        );
    }
}

export default DataFlow;