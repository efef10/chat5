import * as React from 'react';
import {appService} from "../models/AppStore";
import './CreateUser.css'
// import {Redirect} from 'react-router-dom';

class CreateUser extends React.Component{
    constructor(props:any){
        super(props);
    }

    onSubmit(e:any){
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const age = e.target.elements.age.value;
        // const imageUrl = e.target.elements.imageUrl.value;
        if(!isNaN(age)){
            appService.addUser(username,password,Number(age));

        }

    }

    render(){
        return(
            <>

                <form onSubmit={this.onSubmit} className="createUser">
                    <h1>Create New User:</h1>
                    <div className="userDetail">
                        <span>*</span><label htmlFor="username">Username:</label>
                        <input name="username" type="text"/>
                    </div>
                    <div className="userDetail">
                        <span>*</span><label htmlFor="password">Password:</label>
                        <input name="password" type="password"/>
                    </div>
                    <div className="userDetail">
                        <span>*</span><label htmlFor="age">Age:</label>
                        <input name="age" type="text"/>
                    </div>

                    {/*<label htmlFor="imageUrl">Image URL:</label>*/}
                    {/*<input name="imageUrl" type="text"/>*/}
                    <input type="submit" value="save"/>
                </form>
            </>
        )
    }
}

export default CreateUser;