import React, { Component } from "react";
import axios from "axios";
import { localhost } from "../../GlobalVars";

import { Button, Card } from "react-bootstrap";

export default class DevsCards extends Component {
  state = { user: null };
  componentDidMount = () => {
    axios
      .get(`${localhost}/user/${this.props.userId}`)
      .then(result => {
        this.setState({ user: result.data });
      })
      .catch(err => console.log(err));
  };

  chooseDev = () => {
    axios
      .put(`${localhost}/job/developer/${this.props.job_id}`, {
        dev_id: this.props.userId
      })
      .then(result => {
        this.setState({ user: result.data });
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.user != null && (
          <Card>
            <Card.Body>
              <h2>
                <a href={`/Portfolio/${this.state.user.username}`}>
                  <p>
                    {this.state.user.firstname} {this.state.user.lastname}{" "}
                  </p>
                </a>
              </h2>
              <Card.Text>
                <Button onClick={this.chooseDev}>Choose dev</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}
