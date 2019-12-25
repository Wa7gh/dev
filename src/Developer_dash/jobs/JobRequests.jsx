import React, { Component } from "react";
import axios from "axios";
import { localhost } from "../../GlobalVars";
import jwt_decode from "jwt-decode";

export default class JobRequests extends Component {
  state = {
    jobs: null,
    show: false,
    details: null,
    job_id: null,
    jobs: [],
    userId: jwt_decode(localStorage.usertoken).user._id
  };

  componentDidMount = () => {
    axios
      .get(`${localhost}/job/developer/${this.state.userId}`)
      .then(r => {
        this.setState({ jobs: r.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.jobs.length > 0 &&
          this.state.jobs.map(item => console.log(item.title))}
      </div>
    );
  }
}
