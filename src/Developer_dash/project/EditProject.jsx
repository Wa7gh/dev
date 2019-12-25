import React from "react";
import { useFormik } from "formik";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import axios from "axios";
import { localhost } from "../../GlobalVars";

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
const EditProjectForm = props => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      github: "",
      link: ""
    },
    validate,
    onSubmit: async values => {
      axios
        .put(`${localhost}/project/${props.location.state.data._id}`, values)
        .then()
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
                label="Image"
                id="image"
                name="image"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image}
              />
              {formik.touched.image && formik.errors.image ? (
                <div>{formik.errors.image}</div>
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
              <MDBBtn id="btn-primary" type="submit" color="primary">
                Edit
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default EditProjectForm;
