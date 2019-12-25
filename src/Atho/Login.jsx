import React ,{ useState } from 'react';
import imgre from "../Images/imgre.png"
import { useFormik } from 'formik';
import Typical from 'react-typical'
import { login } from './functionAuth'
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import "./Atho.css"

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = "Required"
  }

  return errors;
};

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(false);
  const [emp, setEmp] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (values) => {
      login(values)
        .then(res => {

          if (res.data === "1") {

            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'password is incorrect',
              showConfirmButton: false,
              timer: 1500
            })


          } else if (res.data === "2") {

            Swal.fire({
              position: 'top-end',
              icon: 'info',
              title: 'email not found',
              showConfirmButton: false,
              timer: 1500
            })

          } else {
            localStorage.setItem('usertoken', res.data)

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'login successfully',
              showConfirmButton: false,
              timer: 1500
            })

            if (jwt_decode(localStorage.usertoken).user.role === "1") {
              setUsername(jwt_decode(localStorage.usertoken).user.username)
              setShow(!show)
              window.location.reload()
            } else {
              setEmp(!emp)
              window.location.reload()
            }
          }
        }).catch(err => console.log(err))
    },
  });
  return (
    <div>
      <img style={{ width: '100%', height: '150%' }} src={imgre} alt = "" />


      <Typical className="deverlperReg"
        steps={['Login to your', 1500, 'Login to your account....', 50000]}
        loop={Infinity}
        wrapper="p"
      />

      <MDBContainer className="register" >
        {show && <Redirect to={{ pathname: `/Portfolio/${username}` }} />}


        {emp && <Redirect to={{ pathname: `/` }} />}

        {/* {emp && <Redirect to={{ pathname: `/EmpDash` }} />}  */}

        <MDBRow>
          <MDBCol md="6">
            <form onSubmit={formik.handleSubmit}>
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
              <button type="submit" className="bot" >Login</button >

            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default LoginForm;
