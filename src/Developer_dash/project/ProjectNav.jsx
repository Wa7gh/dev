import React, { Component } from 'react'
import {Nav} from "react-bootstrap"

export default class ProjectNav extends Component {
    render() {
        return (
            <div>
        <Nav fill variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/dashboard/Dev-Projects/addProject">add project </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/dashboard/Dev-Projects/projects">Show project</Nav.Link>
          </Nav.Item>
        </Nav>
            </div>
        )
    }
}
