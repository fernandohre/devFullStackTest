import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
const SubMessages = (props) => {
    return(
        <div>
            <ListGroup variant="flush">
                {props.subMessages && props.subMessages.length ?
                    props.subMessages.map((subMessage) => {
                        return (
                            <div key={subMessage.id + "_subItem" + uuidv4()}>
                                <ListGroup.Item>{subMessage.subject}</ListGroup.Item>
                            </div>
                        )
                    }) : ''
                }
            </ListGroup>
        </div>
    )
}

export default SubMessages;