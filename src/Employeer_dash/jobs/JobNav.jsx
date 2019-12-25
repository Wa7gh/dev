import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { localhost } from "../../GlobalVars";
import jwt_decode from "jwt-decode";
import AddJob from "./AddJob";
import JobsCards from "./JobsCards";
import { Row, Col } from "react-bootstrap";
import ReqCard from "./JobsCardsEmp";
import DCards from "./DevsCards";

export default class JobNav extends Component {
  state = {
    showT: "",
    jobs: null,
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false
  };

  showStuff = e => {
    var tab1 = false;
    var tab2 = false;
    var tab3 = false;
    var tab4 = false;
    if (e.target.name === "create") {
      tab1 = true;
    } else if (e.target.name === "assigned") {
      tab2 = true;
    } else if (e.target.name === "unassigned") {
      tab3 = true;
    } else if (e.target.name === "requested") {
      tab4 = true;
    }
    this.setState({
      showT: e.target.name,
      details: null,
      show: false,
      tab1: tab1,
      tab2: tab2,
      tab3: tab3,
      tab4: tab4
    });
  };

  componentDidMount = () => {
    axios
      .get(
        `${localhost}/job//employer/${
          jwt_decode(localStorage.usertoken).user._id
        }`
      )
      .then(items => {
        var requested = [];
        var unassigned = [];
        var assignedJobs = [];

        items.data.map(t => {
          if (t.requests.length === 0 && !t.dev_id) {
            unassigned.push(t);
          }
          if (t.requests.length > 0) {
            requested.push(t);
          }

          if (t.dev_id) {
            assignedJobs.push(t);
          }
        });
        this.setState({
          requested: requested,
          unassigned: unassigned,
          assignedJobs: assignedJobs
        });
      })
      .catch(err => console.log(err));
  };

  showDetails = (item, job_id) => {
    this.setState({ details: item, show: true, job_id: job_id });
  };

  render() {
    return (
      <div>
        <Nav fill variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link
              onClick={this.showStuff}
              name="create"
              disabled={this.state.tab1}
            >
              create
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              name="assigned"
              disabled={this.state.tab2}
              onClick={this.showStuff}
            >
              assigned
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              name="unassigned"
              disabled={this.state.tab3}
              onClick={this.showStuff}
            >
              unassigned
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              name="requested"
              disabled={this.state.tab4}
              onClick={this.showStuff}
            >
              requested
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {this.state.showT === "create" && (
          <div>
            {" "}
            <AddJob />{" "}
          </div>
        )}

        {this.state.showT === "assigned" && (
          <div>
            {this.state.assignedJobs.map(job => {
              return <JobsCards data={job} />;
            })}
          </div>
        )}

        {this.state.showT === "unassigned" && (
          <div>
            {this.state.unassigned.map(job => {
              return <JobsCards data={job} />;
            })}
          </div>
        )}

        {this.state.showT === "requested" && (
          <Row>
            <Col md="8">
              {this.state.requested.map(job => {
                return <ReqCard data={job} showDetails={this.showDetails} />;
              })}
            </Col>
            {this.state.details != null && this.state.show && (
              <Col md="4">
                {this.state.details.map(res => (
                  <DCards job_id={this.state.job_id} userId={res} />
                ))}
              </Col>
            )}
          </Row>
        )}
      </div>
    );
  }
}
