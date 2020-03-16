import React, { Component } from 'react'
import { Menu, MenuItem, Segment } from 'semantic-ui-react';
import MessageForm from './MessageForm';
import MessageList from './MessageList'
import api from '../services/api';
import LoaderPage from './LoaderPage';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            activeItem: 'Cadastrar Recado',
            messages: []
        }
    }

    componentDidMount() {
        api.get('/Messages')
            .then(result => {
                console.log(result.data.data);
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
                        name='Ver Recados'
                        active={this.state.activeItem === 'Ver Recados'}
                        onClick={this.handleItemClick}
                    />
                    <MenuItem
                        name='Cadastrar Recado'
                        active={this.state.activeItem === 'Cadastrar Recado'}
                        onClick={this.handleItemClick}
                    />
                </Menu>

                {this.state.isLoading ? <LoaderPage /> :
                    <Segment>
                        {this.state.activeItem === 'Cadastrar Recado' ? <MessageForm
                            activeItem={this.state.activeItem}
                            addNewMessage={this.addNewMessage}
                            messagesCount={this.state.messages.length}
                        />
                            :
                            <MessageList
                                activeItem={this.state.activeItem}
                                messages={this.state.messages}
                            />}
                    </Segment>}
            </div>
        )
    }
}
export default MainPage
