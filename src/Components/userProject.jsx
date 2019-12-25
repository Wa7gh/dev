import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export const userProject = props => {
  return Object.keys(props).includes("ele") ? (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        style={{ width: "18rem", height: "10rem" }}
        src={props.ele.image}
      />
      <Card.Body>
        <Card.Title>{props.ele.title}</Card.Title>
        <Card.Text>{props.ele.description}</Card.Text>
        <Button variant="primary">
          {" "}
          <Link to={props.ele.github}> gitHub </Link>{" "}
        </Button>
        <Button variant="primary">
          <Link to={props.ele.link}> project Link </Link>
        </Button>
      </Card.Body>
    </Card>
  ) : (
    "Loading Data...."
  );
};
export default userProject;
