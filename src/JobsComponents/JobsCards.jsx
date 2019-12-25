import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import "./jobs.css";
export default class JobsCards extends Component {
  render() {
    var techs = [];
    this.props.data.technologies.forEach(item => techs.push(<p>{item}</p>));
    return (
      <Fade top>
        <Card className="cardJobSt">
          <Card.Body>
            <h1>Job title {this.props.data.title}</h1>
            <p>Job description {this.props.data.description}</p>
            <p>Job budget {this.props.data.budget}</p>
            <Button
              variant="primary"
              onClick={() => this.props.showDetails(this.props.data)}
            >
              Show details
            </Button>
          </Card.Body>
        </Card>
        <br />
      </Fade>
    );
  }
}
