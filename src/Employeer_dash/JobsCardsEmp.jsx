import React, { Component } from "react";

export default class JobsCardsEmp extends Component {
  render() {
    return (
      <div>
        <p>{this.props.data.title}</p>
        <button
          onClick={() =>
            this.props.showDetails(
              this.props.data.requests,
              this.props.data._id
            )
          }
        >
          show details
        </button>
      </div>
    );
  }
}
