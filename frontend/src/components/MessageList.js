import React, { Component } from 'react';
import { Divider, Header} from 'semantic-ui-react';
import MessageGroup from './MessageGroup'
class MessageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <Header floated='left'>
                    <span >Recados</span>
                </Header>
                <div className='divisorDiv'>
                    <Divider></Divider>
                </div>

                <MessageGroup 
                    messages={this.props.messages}
                />

                <h2 style={{textAlign: 'center'}}>Você tem {this.props.messages.length} mensagens no total</h2>
            </div>
        );
    }
}

export default MessageList