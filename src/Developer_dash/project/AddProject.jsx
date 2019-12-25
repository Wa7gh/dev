import React from "react";
import "./project.css";
import { useFormik } from "formik";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

import { fileUploadHandler, getImagesUrl } from "../../ImageUpload/UploadImage";

import Axios from "axios";
import { localhost } from "../../GlobalVars";
import jwt_decode from "jwt-decode";

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.email = "Required";
  }
  if (!values.description) {
    errors.password = "Required";
  }
  return errors;
};
const AddProjectForm = () => {
  const buttonClick = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      formik.values.image = image;
    }
  };
  const uploadTheImage = () => {
    fileUploadHandler(formik.values.image);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      github: "",
      link: "",
      user: jwt_decode(localStorage.usertoken).user._id
    },
    validate,
    onSubmit: async values => {
      getImagesUrl(values.image.name).then(url => {
        values.image = url;

        Axios.post(`${localhost}/project/create`, values)
          .then(result => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "successfully added project",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(err => console.log(err));
      });
    }
  });
  return (
    <div className="AddProject" id="myform">
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
                label="Github"
                id="github"
                name="github"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.github}
              />
              {formik.touched.github && formik.errors.github ? (
                <div>{formik.errors.github}</div>
              ) : null}

              <input type="file" name="files" id="" onChange={buttonClick} />
              {formik.touched.image && formik.errors.image ? (
                <div>{formik.errors.image}</div>
              ) : null}
              <br />
              <MDBBtn id="btn-primary" onClick={uploadTheImage}>
                Upload image{" "}
              </MDBBtn>

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

export default AddProjectForm;
