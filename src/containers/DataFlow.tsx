import * as React from 'react';
import Send from '../components/Send';
import History from './History';
import {IMessage} from '../models/Group';

interface IDataFlowProps{
    messages:IMessage[];
}


class DataFlow extends React.Component<IDataFlowProps,{}>{
    constructor(props:IDataFlowProps){
        super(props);
    }

    public render(){
        return(
            <div className='dataFlow'>
                <History messages={this.props.messages}/>
                <Send/>
            </div>
        );
    }
}

export default DataFlow;