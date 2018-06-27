import * as React from 'react';
import {appService} from "../src/models/AppStore";

import Popup from './components/PopUp';
import AddUserToGroup from './containers/AddUserToGroup';
import './App.css';
import {Link,Route,Switch} from 'react-router-dom';
const FontAwesome = require('react-fontawesome');
import '../node_modules/font-awesome/css/font-awesome.min.css';
import MainData from "./containers/MainData";
import DisplayList from "./components/DisplayList";
import CreateUser from "./components/CreateUser";
import Edit from "./components/Edit";
import CreateGroup from "./components/CreateGroup";
import EditGroup from "./components/EditGroup";
import {Group} from './models/Group';
// import * as io from 'socket.io-client';
import {IMessage} from './models/Group'
// const socket = io.connect("http://localhost:4000");

interface IAppState{
    showPopup:boolean,
    groups:object[],
    users:object[],
    children:object[],
    tree:Group[],
    messages:IMessage[],
    connectors:object[],

}

class App extends React.Component<{},IAppState> {
    private myDropdown:any;
    // private socket:any;

    constructor(props:any){
        super(props);

        this.state = {
            showPopup: false,
            groups:[],
            users:[],
            tree:[],
            children:[],
            messages:[],
            connectors:[],
        };

        appService.subscribe((data:{groups:object[],
                                           users:object[],
                                           tree:Group[],
                                           messages:IMessage[],
                                           connectors:object[]})=>{
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
            if(data.tree!==this.state.tree) {
                this.setState({
                    tree: data.tree
                });
            }
            if(data.messages!==this.state.messages) {
                this.setState({
                    messages: data.messages
                });
            }
            if(data.connectors!==this.state.connectors) {
                this.setState({
                    connectors: data.connectors
                });
            }

        })
    }

    async componentDidMount(){
        appService.getUsers();
        let groups = await appService.getGroups();
        if(!!groups){
            appService.getTree();
        }
        let tree = this.state.tree;
        debugger
        console.log(tree);
        debugger
        window.onclick = (event:any)=> {
            if (event.target && !event.target.matches('.dropbtn')) {
                var dropdowns = this.myDropdown;
                if (dropdowns.classList.contains('show')) {
                    dropdowns.classList.remove('show');
                }
            }
        }
        }

    public messageAdded(){
        // socket.emit("message",msg);
        //
        // socket.on('message', (msg:any)=>{
        //     this.setState({message:this.state.messages.concat([message])})
        // });

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

    public renderLogIn=(props:any)=>(<Popup {...props}/>);
        // (appService.getLoggedUser()===""?<Popup {...props} />:<Redirect to={{pathname:"/"}}/>)

    public renderSignUp = (props:any)=>
        (<div/>)

    public generateLink(){
        let group = appService.getSelectedGroup();
        if(!!group){
            return `/groups/${group}/add`
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

    public deleteUser=(userId:string)=>{
        appService.deleteUser(userId);
    }

    public deleteGroup=(groupId:string)=>{
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

    public editGroup = (props:any)=>{
        return (props.location.state?
                 <EditGroup {...props} list={props.location.state.children} users={this.state.users}/>:
                 <div/>)
    }


    public renderMain =()=>(
        <MainData groups={this.state.tree} messages={this.state.messages}>
            <div>
                <Route exact={true} path='/login' render={this.renderLogIn}/>
            </div>
        </MainData>)

  public render() {


    return (
      <div className="App">
          <Route path='/login' render={this.renderLogIn}/>
          <div className='header'>

              <div className="dropdown navElement">
                  <div onClick={this.myFunction} className="dropbtn"><FontAwesome name='bars' className="dropbtn"/></div>
                  <div ref={elem=>this.myDropdown = elem} id="myDropdown" className="dropdown-content">
                      <Link to='/users'>Manage Users</Link>
                      <Link to='/groups'>Manage Groups</Link>
                  </div>
              </div>

              <Link to="/"><div className='navElement'>Home</div></Link>
              {appService.getSelectedGroup()!==""?<Link to={this.generateLink()}><FontAwesome onClick={this.togglePopup} name='user-plus' /></Link>:null}
              <Link to={appService.getLoggedUser()===""?"/login":"/"}><div id='logIn' onClick={appService.getLoggedUser()===""?this.togglePopup:this.logOut}>{appService.getLoggedUser()===""?"Log In":"Log Out"}</div></Link>

          </div>
          <Switch>
              <Route exact={true} path='/groups/:group/add' component={AddUserToGroup}/>
              <Route exact={true} path='/users' render={this.renderDisplayUsers}/>
              <Route exact={true} path='/groups' render={this.renderDisplayGroups}/>
              <Route exact={true} path='/users/new' component={CreateUser}/>
              <Route exact={true} path='/users/:id' render={this.edit}/>
              <Route exact={true} path='/groups/new' render={this.renderCreateGroup}/>
              <Route exact={true} path='/groups/:id' render={this.editGroup}/>
              <Route exact={true} path='/' render={this.renderMain}/>
              <MainData groups={this.state.tree} messages={this.state.messages}>
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
