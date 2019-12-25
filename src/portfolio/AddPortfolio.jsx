import React, { useState } from "react";
import { useFormik } from "formik";
import { addpro } from "./functionPro";
import { Redirect } from "react-router-dom";
import Typical from "react-typical";
import "../Atho/Atho.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import { fileUploadHandler, getImagesUrl } from "../ImageUpload/UploadImage";

const validate = values => {
  const errors = {};

  if (!values.education) {
    errors.education = "Required";
  }

  if (!values.jobPosition) {
    errors.jobPosition = "Required";
  }

  if (!values.brandstatment) {
    errors.brandstatment = "Required";
  }

  if (!values.github) {
    errors.github = "Required";
  }

  if (!values.linkdin) {
    errors.linkdin = "Required";
  }

  if (!values.twitter) {
    errors.linkdin = "Required";
  }

  return errors;
};

const AddPortfolio = props => {
  const [show, setShow] = useState(false);

  const buttonClick = event => {
    if (event.target.files[0]) {
      const img = event.target.files[0];
      formik.values.img = img;
    }
  };

  const uploadTheImage = () => {
    fileUploadHandler(formik.values.img);
  };

  const formik = useFormik({
    initialValues: {
      user: props.user_id,
      education: "",
      img: "",
      jobPosition: "",
      brandstatment: "",
      github: "",
      linkdin: "",
      twitter: ""
    },
    validate,
    onSubmit: async values => {
      getImagesUrl(values.img.name).then(url => {
        values.img = url;
        addpro(values)
          .then(r => {
            setShow(!show);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully added your information",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(err => console.log(err));
      });
    }
  });
  return (
    <div>
      <Typical
        className="deverlperReg"
        steps={[
          "Enter your Informati",
          1500,
          "Enter your Information ....",
          50000
        ]}
        loop={Infinity}
        wrapper="p"
      />

      <MDBContainer className="register">
        {show && <Redirect to={{ pathname: `/login` }} />}

        <MDBRow>
          <MDBCol md="6">
            <form onSubmit={formik.handleSubmit}>
              <MDBInput
                label="education"
                id="education"
                name="education"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.education}
              />
              {formik.touched.education && formik.errors.education ? (
                <div>{formik.errors.education}</div>
              ) : null}

              <MDBInput
                label="Job position"
                id="jobPosition"
                name="jobPosition"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobPosition}
              />
              {formik.touched.jobPosition && formik.errors.jobPosition ? (
                <div>{formik.errors.jobPosition}</div>
              ) : null}

              <MDBInput
                label="Brand statment"
                id="brandstatment"
                name="brandstatment"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brandstatment}
              />
              {formik.touched.brandstatment && formik.errors.brandstatment ? (
                <div>{formik.errors.brandstatment}</div>
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

              <MDBInput
                label="Linkdin"
                id="linkdin"
                name="linkdin"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkdin}
              />
              {formik.touched.linkdin && formik.errors.linkdin ? (
                <div>{formik.errors.linkdin}</div>
              ) : null}

              <MDBInput
                label="twitter"
                id="twitter"
                name="twitter"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twitter}
              />
              {formik.touched.twitter && formik.errors.twitter ? (
                <div>{formik.errors.twitter}</div>
              ) : null}

              <input type="file" name="files" id="" onChange={buttonClick} />
              <br />
              <button className="bot1" onClick={uploadTheImage}>
                Upload image{" "}
              </button>
              <button className="bot"> Submit </button>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default AddPortfolio;
