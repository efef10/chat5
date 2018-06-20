import * as React from 'react';
import './Management.css';


class Management extends React.Component{
    private myDropdown:any;

    constructor(props:any){
        super(props);
    }

     myFunction=()=> {
         this.myDropdown.classList.toggle("show");
    }

    render(){
        return (
            <div className="dropdown">
            <button onClick={this.myFunction} className="dropbtn">Manage</button>
            <div ref={elem=>this.myDropdown = elem} id="myDropdown" className="dropdown-content">
                <a href="#">Manage Users</a>
                <a href="#">Manage Groups</a>
            </div>
        </div>)
    }
}

export default Management;