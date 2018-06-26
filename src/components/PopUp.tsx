import * as React from 'react'
import {Link} from 'react-router-dom';
import {appService} from "../models/AppStore";
import './Popup.css';

// this.props.match.params.id

interface IPopupProps{
    history:any
}

class Popup extends React.Component<IPopupProps, {}>{
    constructor(props:IPopupProps){
        super(props);
    }
    private userName:any
    private password:any
    private hint:any

    public logUser=()=>{
        if(appService.auth(this.userName.value,this.password.value)){
            appService.logUser(this.userName.value);
            this.props.history.push('/')
        }
        else{
            alert("user name or password is not correct");
        }
    }

    public pStyle = {
        display:"none",
    }

    public showHint=()=>{
        this.hint.style = {display:"block"};
    }

    public render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <Link to="/"><button>X</button></Link>
                    <h2>Log In</h2>
                    <div>
                        <input ref={elem=>this.userName =elem} id="userName" type="text" placeholder='User name'/>
                    </div>
                    <div>
                        <input id="password" type="password" placeholder='Password' ref={elem=>this.password = elem}/>
                    </div>
                    <div>
                        <input type="submit" value="Log In" onClick={this.logUser}/>
                    </div>
                    <a onClick={this.showHint}>forgot password?</a>
                    <p ref={elem=>this.hint=elem} style={this.pStyle}>your password is your username...</p>
                </div>
            </div>
        );
    }
}

export default Popup;