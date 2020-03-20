import React, { Component, } from 'react';
import { Form, Divider, Header, Modal, Button,Icon } from 'semantic-ui-react';
import '../css/MessageForm.css';
import api from '../services/api';
class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentMessage: {
                sender: '',
                receiver: '',
                subject: '',
                textDescription: ''
            }
        }
        
    }
    
    handleOpen = () => this.setState({ showModal: true })

    handleClose = () => this.setState({ showModal: false })

    handleEventSubmit = (e) => {
        e.preventDefault();
        const sender = e.currentTarget.elements['sender'].value;
        const receiver = e.currentTarget.elements['receiver'].value;
        const subject = e.currentTarget.elements['subject'].value;
        const textDescription = e.currentTarget.elements['textDescription'].value;
        
        if (this.state != null) {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            api.post('/Messages', {
                sender: sender,
                receiver: receiver,
                subject: subject,
                text: textDescription
            }, options).then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
                this.handleOpen();
            });

            this.props.addNewMessage({
                id: this.props.messagesCount + 1,
                sender: sender,
                receiver: receiver,
                subject: subject,
                textDescription: textDescription
            });
        }

    }
 
    render() {
        
        return (
            <div className="message-form">
                <div>
                    <Header floated='left'>
                        <span >Cadastrar Recado</span>
                    </Header>

                    <Header floated='right'>
                    </Header>
                </div>
                <div className="divisorDiv">
                    <Divider></Divider>
                </div>
                <div className="messageForm">
                    <Form onSubmit={this.handleEventSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input
                                name='sender'
                                fluid label='De'
                                placeholder='Remetente'
                                required
                            />
                            <Form.Input
                                name='receiver'
                                fluid label='Para'
                                placeholder='Destinatário'
                                required
                            />
                            <Form.Input
                                name='subject'
                                fluid label='Assunto'
                                placeholder='Assunto'
                            />
                        </Form.Group>
                        <Form.TextArea
                            name='textDescription'
                            label='Recado'
                            placeholder='Escreva aqui o seu recado...'
                            required
                        />
                        <Modal
                            trigger={<Form.Button  type="submit">Enviar</Form.Button>}
                            open={this.state.showModal}
                            onClose={this.handleClose}
                            basic
                            size='tiny'
                            style={{position: 'relative'}}
                        >
                            <Header icon='browser' content='Mensagem' />
                            <Modal.Content>
                            <h3>Recado cadastrado com sucesso!</h3>
                            </Modal.Content>
                            <Modal.Actions>
                            <Button color='green' onClick={this.handleClose} inverted>
                                <Icon name='checkmark' /> Continuar
                            </Button>
                            </Modal.Actions>
                        </Modal>
                    </Form>
                </div>
            </div>
        );
    }
}
export default MessageForm