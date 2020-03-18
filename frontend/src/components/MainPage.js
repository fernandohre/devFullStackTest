import React, { Component } from 'react'
import { Menu, MenuItem, Segment } from 'semantic-ui-react';
import MessageForm from './MessageForm';
import MessageList from './MessageList'
import api from '../services/api';
import LoaderPage from './LoaderPage';

const registerMessage = 'Cadastrar Recado';
const seeMessage = 'Ver Recados';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            activeItem: registerMessage,
            messages: []
        }
    }

    componentDidMount() {
        api.get('/Messages')
            .then(result => {
                this.setState({
                    isLoading: false,
                    messages: [...result.data.data]
                });
            }).catch(error => console.log(error));
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        });
    }

    addNewMessage = (newMessage) => {
        this.state.messages.push(newMessage);
    }

    render() {
        return (
            <div>
                <Menu pointing>
                    <MenuItem
                        name={seeMessage}
                        active={this.state.activeItem === seeMessage}
                        onClick={this.handleItemClick}
                    />
                    <MenuItem
                        name={registerMessage}
                        active={this.state.activeItem === registerMessage}
                        onClick={this.handleItemClick}
                    />
                </Menu>

                {this.state.isLoading ? <LoaderPage /> :
                    <Segment>
                        {this.state.activeItem === registerMessage ? 
                        <MessageForm
                            addNewMessage={this.addNewMessage}
                            messagesCount={this.state.messages.length}
                        />
                        :
                        <MessageList
                            messages={this.state.messages}
                        />}
                    </Segment>}
            </div>
        )
    }
}
export default MainPage
