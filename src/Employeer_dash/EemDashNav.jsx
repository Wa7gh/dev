import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class EemDashNav extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="///"> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="mr-auto">
            <Nav.Link href="/EmpDash/editprofile">r</Nav.Link>
            <Nav.Link href="/EmpDash/Emp-Projects"></Nav.Link>
            <Nav.Link href="/EmpDash/Emp-Jobs"></Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
