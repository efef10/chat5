import * as React from 'react';
import {appService} from "../models/AppStore";
// import {Redirect} from 'react-router-dom';
import './CreateGroup.css'

interface ICreateGroupProps{
    groups:any[]
}

class CreateGroup extends React.Component<ICreateGroupProps,{}>{
    constructor(props:ICreateGroupProps){
        super(props);
    }

    onSubmit(e:any){
        debugger
        const groupName = e.target.elements.groupName.value;
        const selectWrapper = e.target.elements.selectedGroup;
        const selected = selectWrapper.options[selectWrapper.selectedIndex];
        // console.log(selected.value);
        appService.addGroup(groupName,Number(selected.value));
    }

    render(){
        let options;
        options = this.props.groups.map((group:any,idx:any)=>{
                return (
                    <option key={idx} value={group.id}>{"-- "+group.name}</option>
                )
            })


        // const options = ([<option key={1} value="volvo">Volvo</option>]

        return(
            <>
                <h2>Create a New Group</h2>
            <form onSubmit={this.onSubmit} id="createGroup">
                <div className="field">
                    <span>*</span>
                    {/*<label htmlFor="groupName">Group Name:</label>*/}
                    <input name="groupName" type="text" placeholder="Group Name"/>
                </div>
                <div className="field">
                    <span>*</span>
                    <label id="labelCombo" htmlFor="selectedGroup">to group:</label>
                    <select name="selectedGroup" id="selectedGroup">
                        {options}
                    </select>
                </div>
                <div className="submit">
                    <input type="submit" value="save"/>
                </div>
            </form>
                </>
        )
    }
}

export default CreateGroup;