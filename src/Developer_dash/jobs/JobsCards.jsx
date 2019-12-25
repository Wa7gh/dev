import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
export default class JobsCards extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <h1>{this.props.data.title}</h1>
                        <Card.Text>
                            {this.props.data.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
