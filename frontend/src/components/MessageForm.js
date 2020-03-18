import React, { Component } from 'react';
import { Form, Divider, Header } from 'semantic-ui-react';
import '../css/MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            sender: '',
            receiver: '',
            subject: '',
            textDescription: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    clearFormMessage = () => {
        this.setState({
            sender: '',
            receiver: '',
            subject: '',
            textDescription: ''
        })
    }

    handleEventSubmit = (event) => {
        const { sender, receiver, subject, textDescription} = this.state;
        if (this.state != null) {
            this.props.addNewMessage({
                id: this.props.messagesCount + 1,
                sender: sender,
                receiver: receiver,
                subject: subject,
                textDescription: textDescription
            });
            this.clearFormMessage();
        }
        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="message-form">
                <div>
                    <Header floated='left'>
                        <span >Cadastrar Recado</span>
                    </Header>
                        
                    <Header floated='right'>
                        <Form.Button onClick={this.handleEventSubmit}>Enviar</Form.Button>
                    </Header>
                </div>
                <div className="divisorDiv">
                    <Divider></Divider>
                </div>
                <div className="messageForm">
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input 
                                name='sender'
                                fluid label='De' 
                                placeholder='Remetente' 
                                required
                                value={this.state.sender}
                                onChange={this.handleInputChange}
                            />
                            <Form.Input 
                                name='receiver'
                                fluid label='Para' 
                                placeholder='Destinatário' 
                                required
                                value={this.state.receiver}
                                onChange={this.handleInputChange}
                            />
                            <Form.Input 
                                name='subject'
                                fluid label='Assunto' 
                                placeholder='Assunto'
                                value={this.state.subject}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Form.TextArea 
                            name='textDescription'
                            label='Recado' 
                            placeholder='Escreva aqui o seu recado...' 
                            required
                            onChange={this.handleInputChange}
                            value={this.state.textDescription}
                        />
                    </Form>
                </div>
            </div>
            
        );
    }
}
export default MessageForm