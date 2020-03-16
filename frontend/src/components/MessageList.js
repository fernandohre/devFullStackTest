import React, { Component } from 'react';
import { Divider, Header, List, Icon } from 'semantic-ui-react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div style={{ display: this.props.activeItem === 'Ver Recados' ? 'block' : 'none' }}>

                <Header floated='left'>
                    <span >Recados</span>
                </Header>
                <div className='divisorDiv'>
                    <Divider></Divider>
                </div>

                <List animated verticalAlign='middle'>
                    {this.props.messages.map((message) => (
                        <List.Item key={message.id}>
                            <Icon name='mail'/>
                            <List.Content>
                                <List.Header>{message.subject}</List.Header>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
                <h2>Você tem {this.props.messages.length} mensagens</h2>
            </div>
        );
    }
}

export default MessageList