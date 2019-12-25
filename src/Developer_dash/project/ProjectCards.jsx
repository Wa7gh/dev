import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import "./project.css";
import { localhost } from "../../GlobalVars";
import { Redirect } from "react-router-dom";
export default class ProjectCards extends Component {
  state = {
    show: false
  };
  deleteProject = project => {
    axios
      .delete(`${localhost}/project/${this.props.data._id}`)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });

        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  editProject = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <div>
        <Card>
          {this.state.show && (
            <Redirect
              to={{
                pathname: `/dashboard/EditProject`,
                state: { data: this.props.data }
              }}
            />
          )}
          <br />
          <Card.Header as="h5">{this.props.data.title}</Card.Header>
          <Card.Body>
            <Card.Img
              variant="top"
              src={this.props.data.image}
              style={{ width: "18rem" }}
            />
            <Card.Text>{this.props.data.description}</Card.Text>
            <Button id="btn-primary" onClick={this.editProject}>
              Edit project
            </Button>
            <Button id="btn-primary" onClick={this.deleteProject}>
              delete project
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
