import * as React from 'react'
import {Group} from '../models/Group';
import {appService} from "../models/AppStore";
import TreeChat from './../models/TreeChat'
import './TreeComponent.css';

interface ITree {
    load(items:Group[]):void
    clear():void
    element:HTMLElement
}

interface ITreeComponentState{
    groups:Group[]
}

interface ITreeComponentProps{
    groups:object[]
}

class TreeComponent extends React.Component<ITreeComponentProps,ITreeComponentState>{
    private element:any;
    private tree:ITree

    constructor(props:ITreeComponentProps){
        super(props);
        this.state = {groups:appService.groupsToDisplay()};
    }

    public shouldComponentUpdate(p:any, q:any){
        if(appService.treeShouldUpdate()){
            appService.treeUpdated();
            return true;
        }
        return false;
    }

    public componentDidMount(){
        this.tree = TreeChat(this.element);
        this.tree.load(appService.groupsToDisplay());
    }

    public render(){
        if(!!this.tree){
            this.tree.load(appService.groupsToDisplay());
        }
        return(
            <div>
            <ul className='tree' ref={elem=>this.element=elem}/>
            </div>
        );
    }
}

export default TreeComponent;