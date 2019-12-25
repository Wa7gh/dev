import React, { Component } from "react";
import {Col,Row,Container,} from "react-bootstrap";
import axios from "axios";
import { localhost } from "../GlobalVars";
import jwt_decode from "jwt-decode";
import JCards from "./JobsCardsEmp";
export default class JobsListEmp extends Component {
  state = {
    jobs: null,
    show: false,
    details: null,
    job_id: null,
    userId: localStorage.usertoken
      ? jwt_decode(localStorage.usertoken).user._id
      : null
  };

  componentDidMount = () => {
    if (localStorage.usertoken) {
      axios
        .get(
          `${localhost}/job/employer/${
            jwt_decode(localStorage.usertoken).user._id
          }`
        )
        .then(r => {
          this.setState({ jobs: r.data });
        })
        .catch(err => console.log(err));
    }
  };

  showDetails = (item, job_id) => {
    this.setState({ details: item, show: true, job_id: job_id });
  };

  render() {
    if (this.state.details != null) {
    }
    return (
      <Container>
        <Row>
          <Col>
            {this.state.jobs != null &&
              this.state.jobs.map(item => {
                if (item.status === "unassigned") {
                  return <JCards data={item} showDetails={this.showDetails} />;
                }
              })}
          </Col>
          {this.state.job_id != null &&
            this.state.details != null &&
            this.state.show != false && (
              <Col>
                <p>REQ COL</p>
              </Col>
            )}
        </Row>
      </Container>
    );
  }
}
