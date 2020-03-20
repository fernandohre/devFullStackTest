import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import { v4 as uuidv4 } from 'uuid';

import { Accordion, Icon } from 'semantic-ui-react';
import MessageFormVisualization from './MessageFormVisualization';
import SubMessages from './SubMessages';
const styleList = {
    height: '500px',
    width: '80%',
    overflow: 'hidden', 
    overflowY: 'scroll'
}
class MessageGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedMessages: [],
            activeIndex: -1
        }
        
    }

    getUniqueKey = (item) => {
        return item.id + item.date.toString() + uuidv4();
    }

    render() {

        const hasMessagesToShow = this.props.messages.length > 0;
        const messageItems = hasMessagesToShow ? this.props.messages.map((message, index) => {
            return (<div key={message.id}>
                <Accordion.Title
                    active={this.state.activeIndex === index}
                    index={index}
                    onClick={(e, titleProps) => {
                        const { index } = titleProps;
                        const { activeIndex } = this.state;
                        const newIndex = activeIndex === index ? -1 : index;

                        if (!message.relatedMessages) return;
                        
                        this.setState({
                            activeIndex: newIndex,
                            relatedMessages: message.relatedMessages
                        })
                    }}
                >
                    <Icon name='mail' />
                    {message.subject}
                    {message.relatedMessages && message.relatedMessages.length > 0 
                    ?   
                        <Icon name='plus' style={{marginLeft: '5px', marginRight: '5px'}}>
                            {message.relatedMessages.length}
                        </Icon>
                    : ''}
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === index}>
                    <SubMessages
                        subMessages={message.relatedMessages}
                    />
                </Accordion.Content>
            </div>)
        }) : 'Nenhum recado';
        return (
            <Container fluid>
                <Row>
                    <Col xs lg={4}>
                        <Accordion>
                            {messageItems}
                        </Accordion>
                    </Col>
                    <Col style={styleList}>
                        {
                            this.state.relatedMessages.length > 0 ?
                                this.state.relatedMessages.map((item) => {
                                    console.log(item);
                                    return (
                                        <div key={this.getUniqueKey(item)}>
                                            <MessageFormVisualization
                                                dateOfMessage={item.date}
                                                sender={item.sender}
                                                receiver={item.receiver}
                                                messageText={item.text}
                                                subject={item.subject}
                                            />
                                        </div>
                                    )
                                })
                                : ''
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MessageGroup