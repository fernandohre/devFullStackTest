import React from 'react';
import {Form} from 'react-bootstrap'
import { Divider } from 'semantic-ui-react'

const MessageFormVisualization = (props) => {
    return (
        <div style={{marginBottom: '10%'}}>
            <h2>{props.subject}</h2>
            <Form>
                <Form.Group controlId="dateMessage">
                    <Form.Label>Data do Recado</Form.Label>
                    <Form.Control type="input" readOnly value={props.dateOfMessage}/>
                </Form.Group>

                <Form.Group controlId="senderMessage">
                    <Form.Label>De</Form.Label>
                    <Form.Control type="input" readOnly value={props.sender} />
                </Form.Group>

                <Form.Group controlId="receiberMessage">
                    <Form.Label>Para</Form.Label>
                    <Form.Control type="input" readOnly value={props.receiver} />
                </Form.Group>

                <Form.Group controlId="receiberMessage">
                    <Form.Label>Recado</Form.Label>
                    <Form.Control as="textarea" rows="3" readOnly value={props.messageText}/>
                </Form.Group>
            </Form>
            <Divider />
        </div>
    )
}

export default MessageFormVisualization;