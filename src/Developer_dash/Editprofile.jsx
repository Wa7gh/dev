import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { useFormik } from "formik";
import { localhost } from "../GlobalVars";

const validate = values => {
  const errors = {};
  if (!values.firstname) {
    errors.password = "Required";
  }

  if (!values.lastname) {
    errors.password = "Required";
  }

  if (!values.username) {
    errors.username = "Required";
  }
  return errors;
};

const EditForm = () => {
  const formik = useFormik({
    initialValues: {
      firstname: jwt_decode(localStorage.usertoken).user.firstname,
      lastname: jwt_decode(localStorage.usertoken).user.lastname,
      username: jwt_decode(localStorage.usertoken).user.username,
      user: jwt_decode(localStorage.usertoken).user
    },
    validate,
    onSubmit: async values => {
      var uUser = {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username
      };

      axios
        .put(`${localhost}/user/changedetails/${formik.values.user._id}`, uUser)
        .then(res => {
          if (res.data.msg === "2") {
            alert("Successfully Updated");
            axios
              .post(`${localhost}/user/edit/token`, res.data.user)
              .then(fes => {
                localStorage.setItem("usertoken", fes.data);
                window.location.reload();
              });
          } else {
            alert("Username already taken");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <MDBInput
                label="First name"
                id="firstname"
                name="firstname"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div>{formik.errors.firstname}</div>
              ) : null}
              <MDBInput
                label="Last name"
                id="lastname"
                name="lastname"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <div>{formik.errors.lastname}</div>
              ) : null}
              <MDBInput
                label="Username"
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
              <MDBBtn id="btn-primary" color="primary" href="/changepassword">
                Change password
              </MDBBtn>
              <MDBBtn
                id="btn-primary"
                type="submit"
                color="primary"
                onClick={formik.handleSubmit}
              >
                Submit
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default EditForm;
