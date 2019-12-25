import React from 'react';
import { useFormik } from 'formik';
import { register } from './functionAuth'
import Typical from 'react-typical'
import "./Atho.css"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';

const validate = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'Required';
  } else if (values.firstname.length > 15) {
    errors.firstname = 'Must be 15 characters or less';
  }
  if (!values.lastname) {
    errors.lastname = 'Required';
  } else if (values.lastname.length > 20) {
    errors.lastname = 'Must be 20 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = "Required"
  }

  if (!values.cpassword) {
    errors.cpassword = "Required"
  } else {
    if (values.cpassword !== values.password) {
      errors.cpassword = "password doesn't match"
    }
  }
  if (!values.username) {
    errors.username = "Required"
  }
  return errors;
};
const SignupForm = (props) => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      cpassword: '',
      username: '',
      role:1
    },
    validate,
    onSubmit: async (values) => {
      register(values)
        .then(r => {
          //1 means email is in use
          if(r.data.msg==="1"){
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Email is already in use',
              showConfirmButton: false,
              timer: 1500
            })

          }else if(r.data.msg==="0"){
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'username is already in use',
              showConfirmButton: false,
              timer: 1500
            })

          }else if(r.data.msg==="3"){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Register successfully',
              showConfirmButton: false,
              timer: 1500
            })
            props.toggleSub(r.data.userid,r.data.username)
            //redirect to the add portfolio and send the user id with it
          }
        }
        )
        .catch(err => console.log(err))
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
<Typical className="deverlperReg"
        steps={['Developer', 1500, 'Developer registering ....', 50000]}
        loop={Infinity}
        wrapper="p"
      />
    <MDBContainer className="register">
   
      <MDBRow >
        <MDBCol md="6">
          <form onSubmit={formik.handleSubmit}>
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

            <MDBInput
              label="Email"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <MDBInput
              label="Password"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <MDBInput
              label="Confirm password"
              id="cpassword"
              name="cpassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cpassword}
            />
            {formik.touched.cpassword && formik.errors.cpassword ? (
              <div>{formik.errors.cpassword}</div>
            ) : null}
            <button type="submit" className="bot">Register</button >
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
};

export default SignupForm;