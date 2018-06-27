import * as React from 'react';
import Send from '../components/Send';
import History from './History';
import {IMessage} from '../models/Group';
// import * as io from 'socket.io-client';
import {appService} from "../models/AppStore";
import {socket} from '../models/AppStore'
// const socket = io.connect("http://localhost:4000");



interface IDataFlowProps{
    messages:IMessage[],
}

interface IDataFlowState{
    messages:IMessage[],
}


class DataFlow extends React.Component<IDataFlowProps,IDataFlowState>{

    // private static socket:any = io.connect("http://localhost:4000");

    constructor(props:IDataFlowProps){
        super(props);
        this.state={messages:this.props.messages}

        socket.on('message', (msg:any)=>{
            this.setState({messages:this.state.messages.concat(msg)},()=>{
                console.log("client got message:",msg);
            })
        });
    }

    componentWillReceiveProps(){
        this.setState({messages:this.props.messages});
    }

     addMessage=async(msg:string)=>{
        let message = await appService.addMessage(msg);
        console.log(message);
        // DataFlow.socket.emit("message",message);

    }

    public render(){
        return(
            <div className='dataFlow'>
                <History messages={this.state.messages}/>
                {/*<History messages={this.state.messages}/>*/}
                <Send addMessage={this.addMessage}/>
            </div>
        );
    }
}

export default DataFlow;