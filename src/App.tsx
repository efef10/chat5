import * as React from 'react';
import {appService} from "../src/models/AppStore";

import Popup from './components/PopUp';
// import TreeComponent from './components/TreeComponent';
import AddUserToGroup from './containers/AddUserToGroup';
import './App.css';
import {Link,Redirect,Route,Switch} from 'react-router-dom';
const FontAwesome = require('react-fontawesome');
import '../node_modules/font-awesome/css/font-awesome.min.css';
import MainData from "./containers/MainData";
import DisplayList from "./components/DisplayList";
import CreateUser from "./components/CreateUser";
import Edit from "./components/Edit";
import CreateGroup from "./components/CreateGroup";
import EditGroup from "./components/EditGroup";
// import DisplayList from "./components/DisplayList";
// import Management from "./containers/Management";

interface IAppState{
    showPopup:boolean,
    groups:object[],
    users:object[],
    children:object[],


}

class App extends React.Component<{},IAppState> {
    private myDropdown:any;
    // private children:any[]

    constructor(props:any){
        super(props);

        this.state = {
            showPopup: false,
            groups:[],
            users:[],
            children:[],
        };

        appService.subscribe((data:any)=>{
            if(data.users!==this.state.users){
                this.setState({
                    users:data.users
                });
            }
            if(data.groups!==this.state.groups) {
                this.setState({
                    groups: data.groups
                });
            }
            debugger
        })
    }

    componentDidMount(){
            appService.getUsers();
            appService.getGroups();
        window.onclick = (event:any)=> {
            if (event.target && !event.target.matches('.dropbtn')) {
                var dropdowns = this.myDropdown;
                if (dropdowns.classList.contains('show')) {
                    dropdowns.classList.remove('show');
                }
            }
        }
        }

    myFunction=()=> {
        this.myDropdown.classList.toggle("show");
    }

    public togglePopup = ()=> {
        this.setState({
            showPopup: !this.state.showPopup
        },()=>{
            console.log(this.state.showPopup);
        });
    }

    public logOut=()=>{
        appService.logOut();
    }

    public renderLogIn=(props:any)=>
        (appService.getLoggedUser()===""?<Popup {...props} />:<Redirect to={{pathname:"/"}}/>)

    public renderSignUp = (props:any)=>
        (<div/>)

    public generateLink(){
        let group = appService.getSelectedGroup();
        if(!!group){
            return `/groups/${group.getGroupName()}/add`
        }
        return "";

    }

    public test=()=>{
        return (<div>hghg</div>)
    }

    public renderDisplayUsers=()=>{
        return (<DisplayList type="users" deleteData={this.deleteUser} list={this.state.users}/>)
    }

    public renderDisplayGroups=()=>{
        return (<DisplayList type="groups" deleteData={this.deleteGroup} list={this.state.groups}/>)
    }

    public deleteUser=(userId:number)=>{
        appService.deleteUser(userId);
    }

    public deleteGroup=(groupId:number)=>{
        appService.deleteGroup(groupId);
    }

    public edit=(props:any)=>{
        return (<Edit {...props}/>)
    }

    public renderCreateGroup=()=>{
        return <CreateGroup groups={this.state.groups}/>
    }

    deleteUserFromGroup=(objName:string)=>{

    }

    public newTest(children:any){
        console.log(children);
        return(<div>testing</div>);
    }

    public editGroup = (props:any)=>{
        // this.setState({children:props.location.state.children});
        // return <EditGroup {...props} list={this.state.children}/>
        debugger

        let list = props.location.state.children

        return <EditGroup {...props} list={list}/>
    }


  public render() {
    return (
      <div className="App">
          <div className='header'>

              <div className="dropdown navElement">
                  <div onClick={this.myFunction} className="dropbtn"><FontAwesome name='bars' className="dropbtn"/></div>
                  <div ref={elem=>this.myDropdown = elem} id="myDropdown" className="dropdown-content">
                      <Link to='/users'>Manage Users</Link>
                      <Link to='/groups'>Manage Groups</Link>
                  </div>
              </div>

              <Link to="/"><div className='navElement'>Home</div></Link>
              {appService.getSelectedGroup()!==null?<Link to={this.generateLink()}><FontAwesome onClick={this.togglePopup} name='user-plus' /></Link>:null}
              <Link to={appService.getLoggedUser()===""?"/login":"/"}><div id='logIn' onClick={appService.getLoggedUser()===""?this.togglePopup:this.logOut}>{appService.getLoggedUser()===""?"Log In":"Log Out"}</div></Link>

          </div>
          <Route path='/login' render={this.renderLogIn}/>
          <Switch>
              <Route exact={true} path='/groups/:group/add' component={AddUserToGroup}/>
              <Route exact={true} path='/users' render={this.renderDisplayUsers}/>
              <Route exact={true} path='/groups' render={this.renderDisplayGroups}/>
              <Route exact={true} path='/users/new' component={CreateUser}/>
              <Route exact={true} path='/users/:id' render={this.edit}/>
              <Route exact={true} path='/groups/new' render={this.renderCreateGroup}/>
              <Route exact={true} path='/groups/:id' render={this.editGroup}/>
              <MainData groups={this.state.groups}>
                  <div>
                      <Route exact={true} path='/login' render={this.renderLogIn}/>
                  </div>
              </MainData>
          </Switch>
      </div>
    );
  }
}

export default App;
