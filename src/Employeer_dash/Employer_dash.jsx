import React, { Component } from "react";
import DashEmpNavBar from "./EemDashNav";
import Addjob from "./jobs/JobNav"

export default class Employer_dash extends Component {
  render() {
    return (
      <div>
        <DashEmpNavBar/>
        <br/>
        <Addjob/>
      </div>
    );
  }
}