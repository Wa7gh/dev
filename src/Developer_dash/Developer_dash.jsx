import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"
import DashDevNavBar from "./DashDevNavBar"
import projectNav from "./project/ProjectNav"
import JobNav from "./jobs/JobNav"

import EditProfile from "./Editprofile"
import Projects from "./project/ProjectsPage"

import AddProject from "./project/AddProject"
import EditProject from "./project/EditProject"

export default class Developer_dash extends Component {
  render() {
    return (
      <div>
        <DashDevNavBar/>
        <Router>
        <Route path="/dashboard/editprofile" component = {EditProfile} />
        <Route path="/dashboard/Dev-Projects" component = {projectNav}/> 
        <Route path = "/dashboard/Dev-Jobs" component = {JobNav}/>
        <Route path = "/dashboard/Dev-Projects/projects" component = {Projects}/>
        <Route path = "/dashboard/Dev-Projects/addProject" component = {AddProject}/>
        <Route path = "/dashboard/EditProject" component={EditProject}/>
       </Router>
      </div>
    );
  }
}