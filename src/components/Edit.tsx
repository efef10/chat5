import * as React from 'react';
import {appService} from "../models/AppStore";
import './Edit.css'

interface IEditProps{
    username:string,
    match:any
    location:any
}

interface IEditState{
    age:string,
    profileImg:string,
    password:string
}

class Edit extends React.Component<IEditProps,IEditState>{
    constructor(props:IEditProps){
        super(props);
        this.state={age:this.props.location.state.object.age,
                    profileImg:this.props.location.state.object.profileImg,
                    password:""}
    }

    ageChanged=(e:any)=>{
        this.setState({age:e.target.value});
    }

    passwordChanged=(e:any)=>{
        this.setState({password:e.target.value});
    }

    profileImgChanged=(e:any)=>{
        this.setState({profileImg:e.target.value});
    }


    submit=()=>{
        // const username = this.props.location.state.object.name;
        const id = this.props.location.state.object.id;
        if(this.state.password!==""){
            appService.editUser(id,[{"field":"age","value":Number(this.state.age)},{"field":"password","value":this.state.password}])
        }
        else{
            appService.editUser(id,[{"field":"age","value":Number(this.state.age)}])
        }
    }

    render(){
        return (
            <div className="edit">
                <p>Edit User: {this.props.location.state.object.name}</p>

                <div className="editItem">
                    <label>Age:</label>
                    <input type="text" value={this.state.age} onChange={this.ageChanged} placeholder="Age"/>
                </div>

                {/*<div>*/}
                    {/*<label>Profile Image:</label>*/}
                    {/*<input type="text" value={this.state.profileImg} onChange={this.profileImgChanged} placeholder="Profile Image"/>*/}
                {/*</div>*/}

               <div className="editItem">
                   <label>Password:</label>
                   <input type="text" value={this.state.password} onChange={this.passwordChanged} placeholder="New Password"/>
               </div>
                <div>
                    <input type="submit" onClick={this.submit} value="save"/>
                </div>
            </div>
        )
    }
}

export default Edit;