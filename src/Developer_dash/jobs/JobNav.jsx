import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { localhost } from "../../GlobalVars";
import jwt_decode from "jwt-decode";
import JobsCards from "./JobsCards";

export default class JobNav extends Component {
  state = {
    showT: "",
    jobs: null,
    tab1: false,
    tab2: false
  };

  showStuff = e => {
    var tab1 = false;
    var tab2 = false;

    if (e.target.name === "Prequests") {
      tab1 = true;
    }
    if (e.target.name === "Assigned") {
      tab2 = true;
    }
    this.setState({
      showT: e.target.name,
      tab1: tab1,
      tab2: tab2
    });
  };

  componentDidMount = () => {
    axios
      .get(`${localhost}/job`)
      .then(items => {
        var temp = [];
        var assignedJobs = [];
        items.data.map(t => {
          if (
            t.requests.includes(jwt_decode(localStorage.usertoken).user._id)
          ) {
            temp.push(t);
          }

          if (t.dev_id === jwt_decode(localStorage.usertoken).user._id) {
            assignedJobs.push(t);
          }
        });
        this.setState({ jobs: temp, assignedJobs: assignedJobs });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Nav fill variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link
              onClick={this.showStuff}
              name="Prequests"
              disabled={this.state.tab1}
            >
              Pending requests{" "}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              name="Assigned"
              disabled={this.state.tab2}
              onClick={this.showStuff}
            >
              Assigned
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {this.state.showT === "Prequests" && (
          <div>
            {this.state.jobs.map(job => {
              return <JobsCards data={job} />;
            })}
          </div>
        )}
        {this.state.showT === "Assigned" && (
          <div>
            {this.state.assignedJobs.map(job => {
              return <JobsCards data={job} />;
            })}
          </div>
        )}
      </div>
    );
  }
}
