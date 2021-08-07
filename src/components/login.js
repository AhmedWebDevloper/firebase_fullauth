import React, { useState,useEffect } from "react";
import { Layout } from "./components";
import { auth } from "../components/firebase";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email_login: Yup.string()
    .email("Email Is Invalid")
    .required("Email Is Required"),
  login_password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password Is Required"),
});

const Login = () => {
  const history = useHistory();

  // useEffect(()=>{
  
  //   console.log('Testing', auth.currentUser)
  // },[])

  const forgotpasswordfun = ()=>{
    history.push("/forgotpassword")
  }



const submitlogin = async (value)=>{
    try {
      const result =  await auth.signInWithEmailAndPassword(value.email_login , value.login_password);
      
        if(result.user.emailVerified){
          history.push('/todo')
        }
        else{
          history.push('/verificationpage')

        }
 
      // localStorage.setItem('user', true);
  }
  catch (err){
    console.log('Log In Failed Message , Reason is' , err.message)
  }
 
}
  return (
    <>
      <div className="login-main d-flex justify-content-center mb-4">

        <Formik
          initialValues={{
            email_login: "",
            login_password: "",
          }}
          validationSchema={SignupSchema}

          onSubmit={(value) => {
            // console.log(value.email_login , value.login_password);
        
           submitlogin(value)
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div class="form-floating mb-3">
                <Field
                  type="email"
                  name="email_login"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Email address</label>
                {errors.email_login && touched.email_login ? (
                  <div className=" text-danger ">{errors.email_login}</div>
                ) : null}
              </div>

              <div class="form-floating">
                <Field
                  type="password"
                  name="login_password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
                {errors.login_password && touched.login_password ? (
                  <div className=" text-danger ">{errors.login_password}</div>
                ) : null}
              </div>
<br />
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="reset" className="btn btn-primary mx-2" onClick={forgotpasswordfun}>Forgotpassword</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
