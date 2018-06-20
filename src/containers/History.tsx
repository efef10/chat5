import * as React from 'react';
import {appService} from "../models/AppStore";
import {IMessage} from '../models/Group';
import './History.css';

interface IHistoryProps{
    messages:IMessage[]
}

interface IHistoryState{
    messages:IMessage[]
}
class History extends React.Component<IHistoryProps,IHistoryState>{
    constructor(props:IHistoryProps){
        super(props);
    }

    public owner(message:IMessage){
        if(appService.getChattedWithUser()!=="" || appService.getLoggedUser()===message.userName){
            return "";
        }
        else{
            return message.userName  + "\n";
        }

    }

    public time(message:IMessage){
        let hours = message.date.getHours().toString();
        let minutes = message.date.getMinutes().toString();
        hours = hours.length === 1 ? '0'+hours : hours;
        minutes = minutes.length === 1 ? '0'+minutes : minutes;
        return `  ${hours}:${minutes}`;
    }

    public generateHistory(){
        return this.props.messages.map((message,idx)=>{
            return (
                <pre className='message clearfix' key={idx}>
                    <span className={'histMessage  ' + (message.userName===appService.getLoggedUser()?"myMessage":"")}>
                        <span className='messageOwner'>
                            {this.owner(message)}
                        </span>
                        <span className="text">{message.content}</span>
                        <span className='time'>{this.time(message)}</span>
                    </span>
                    {/*<button onClick={appService.addUser}/>*/}
                </pre>
            )
        });

    }

    public chattingWith=()=>{
        let chatting:string = "you are now chatting ";
        let group = appService.getSelectedGroup();
        let chattedWithUser = appService.getChattedWithUser();
        let loggedUser = appService.getLoggedUser();
        if(!!group){
            return chatting+" in group: "+group.getGroupName();
        }
        else if (loggedUser===chattedWithUser && loggedUser!==""){
            return "talking to yourself? your'e better not to be seen... :-)";
        }
        else if(chattedWithUser!==""){
            return chatting+" with: "+ chattedWithUser;
        }
        else return "";
    }

    public render(){
        const list = this.generateHistory();
        const message = this.chattingWith();
        return(
            <div className='history'>
                {message!=="" ? <div id="historyHeader"><p>{message}</p></div>:<div/>}
                <div className='messages'>{list}</div>
            </div>
        );
    }
}

export default History;