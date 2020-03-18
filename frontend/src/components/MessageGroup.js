import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    DropdownButton,
    Dropdown,
    ButtonGroup,
    ListGroup
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Divider } from 'semantic-ui-react';

class MessageGroup extends Component {
    constructor(props) {
        super(props);
        console.log('MessageGroup: ', props);
    }



    render() {

        const hasMessagesToShow = this.props.messages.length > 0;

        const messageItems = hasMessagesToShow ? this.props.messages.map((message, index) => {
            return (<div key={message.id}>
                <ListGroup.Item eventKey={message.id + "_"} as="li">
                    <i className="envelope icon" style={{ fontSize: '2em' }} />
                    {
                        message.relatedMessages.length > 0 ?
                        <DropdownButton
                            id={uuidv4()}
                            style={{ paddingBottom: '12px' }}
                            as={ButtonGroup}
                            drop="right"
                            variant="No Style"
                            title={message.subject}
                        >
                            {message.relatedMessages.map((subMessage) => {
                                return (
                                    <Dropdown.Item eventKey={subMessage.id + "_dropdownItem"}>
                                        {subMessage.subject}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton> :

                        message.subject
                    }
                    
                </ListGroup.Item>
            </div>)
        }) : 'Nenhum recado';

        return (
            <Container fluid>
                <Row>
                    <Col xs lg={4}>
                        <ListGroup variant="flush" key={uuidv4()}>
                            {messageItems}
                            {/* <ListGroup.Item>
                                <i class="envelope icon" style={styleIcon}></i>

                                <DropdownButton
                                    style={{ paddingBottom: '12px' }}
                                    as={ButtonGroup}
                                    drop="right"
                                    variant="No Style"
                                    title='Cras justo odio'
                                >
                                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                    <Dropdown.Divider />
                                </DropdownButton>
                            </ListGroup.Item> */}

                        </ListGroup>
                    </Col>
                    <Col>
                        Formulário
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MessageGroup