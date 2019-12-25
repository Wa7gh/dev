import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { useFormik } from "formik";
import { localhost } from "../GlobalVars";
import { Redirect } from "react-router-dom";
import "../App.css";

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  }

  if (!values.newPassword) {
    errors.newPassword = "Required";
  }

  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else {
    if (values.cpassword !== values.newPassword) {
      errors.cpassword = "password doesn't match";
    }
  }
  return errors;
};

const ChangepassForm = () => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
      cpassword: ""
    },
    validate,
    onSubmit: async values => {
      axios
        .put(
          `${localhost}/user/changepass/${
            jwt_decode(localStorage.usertoken).user._id
          }`,
          {
            password: values.password,
            newPassword: values.newPassword
          }
        )
        .then(res => {
          if ("1" === res.data) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Old password is not correct",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Password changed successfully",
              showConfirmButton: false,
              timer: 1500
            });
            setShow(!show);
          }
        });
    }
  });
  return (
    <MDBContainer>
      {show && <Redirect to={{ pathname: `/dashboard` }} />}
      <MDBRow>
        <MDBCol md="6">
          <form>
            <div className="grey-text">
              <MDBInput
                id="md-form label"
                label="Enter old password"
                id="password"
                name="password"
                validate
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
              <MDBInput
                label="Enter new password"
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div>{formik.errors.newPassword}</div>
              ) : null}
              <MDBInput
                label="Confirm new password"
                id="cpassword"
                name="cpassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.link}
              />
              {formik.touched.cpassword && formik.errors.cpassword ? (
                <div>{formik.errors.cpassword}</div>
              ) : null}
              <MDBBtn
                id="btn-primary"
                type="submit"
                color="primary"
                onClick={formik.handleSubmit}
              >
                Submit
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ChangepassForm;
