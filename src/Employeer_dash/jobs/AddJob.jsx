import React from "react";
import { localhost } from "../../GlobalVars";
import { useFormik } from "formik";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { Form, Row, Col } from "react-bootstrap";

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.budget) {
    errors.budget = "Required";
  }
  if (!values.deadline) {
    errors.deadline = "Required";
  }
  return errors;
};
const AddJobForm = () => {
  const checkboxclick = e => {
    let temp = formik.values.technologies.slice();
    let fIndex = temp.indexOf(e.target.id);
    if (fIndex < 0) {
      temp.push(e.target.id);
    } else {
      temp.splice(fIndex, 1);
    }
    formik.values.technologies = temp;
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      budget: "",
      technologies: [],
      deadline: "",
      requests: [],
      emp_id: jwt_decode(localStorage.usertoken).user._id
    },
    validate,
    onSubmit: async values => {
      axios
        .post(`${localhost}/job/create`, values)
        .then(result => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add Job successfully",
            showConfirmButton: false,
            timer: 1500
          });
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  });
  return (
    <div>
      <br />
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form onSubmit={formik.handleSubmit}>
              <MDBInput
                label="Title"
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title} </div>
              ) : null}
              <MDBInput
                label="Description"
                id="description"
                name="description"
                type="textarea"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description} </div>
              ) : null}
              <MDBInput
                label="Budget"
                id="budget"
                name="budget"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.budget}
              />
              {formik.touched.budget && formik.errors.budget ? (
                <div>{formik.errors.budget}</div>
              ) : null}
              <MDBInput
                label="deadline"
                id="deadline"
                name="deadline"
                type="Date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deadline}
              />
              {formik.touched.deadline && formik.errors.deadline ? (
                <div>{formik.errors.deadline} </div>
              ) : null}
              <Row>
                <Col>
                  <Form.Check
                    label="Ruby"
                    type="checkbox"
                    id="Ruby"
                    onChange={checkboxclick}
                  />
                  <Form.Check
                    label="javascript"
                    type="checkbox"
                    id="javascript"
                    onChange={checkboxclick}
                  />
                </Col>
                <Col>
                  <Form.Check
                    label="Java"
                    type="checkbox"
                    id="Java"
                    onChange={checkboxclick}
                  />
                  <Form.Check
                    label="C++"
                    type="checkbox"
                    id="C++"
                    onChange={checkboxclick}
                  />
                </Col>
                <Col>
                  <Form.Check
                    label="SQL"
                    type="checkbox"
                    id="SQL"
                    onChange={checkboxclick}
                  />
                  <Form.Check
                    label="C#"
                    type="checkbox"
                    id="C#"
                    onChange={checkboxclick}
                  />
                </Col>
              </Row>

              <br />
              <MDBBtn id="btn-primary" type="submit" color="primary">
                Add
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default AddJobForm;
