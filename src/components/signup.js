import React, { useState } from "react";
import { auth } from "../components/firebase";
import { Formik, Form, Field, useField } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email_login: Yup.string().email("Email Is Invalid").required("Email Is Required"),
  login_password: Yup.string()
  .min(6, "Password must be atleast 6 characters")
  .required("Password Is Required"),
  login_number: Yup.string().required("Number Is Required").length(11,"Length must be 11 of digits"),
  user_img: Yup.string().required("Profile Img Is Required")
});

const SingnUp = () => {

  const history = useHistory();
  
  const submit_signup = async (value)=>{
    try {
      const result =  await auth.createUserWithEmailAndPassword(value.email_login , value.login_password);
      await result.user.sendEmailVerification()
    
// console.log("okss---",result.user.phoneNumber ='31321312')
      // alert(result.user.email)
      history.push('/verificationpage')
      // localStorage.setItem('user', true);
  }
  catch (err){
      console.log('Sign Up Failed Message , Reason is' , err.message)
  }
 
}

  return (
    <>

      <div className="login-main d-flex justify-content-center mb-4">
        <Formik
          initialValues={{
            email_login: "",
            login_password: "",
            login_number: "",
            user_img: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(value) => {
            console.log(value);

            // console.log(value.email_login , value.login_password);
        
            submit_signup(value)
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
            <div class="form-floating">
              <Field
                type="text"
                maxLength="11"
                name="login_number"
                class="form-control"
                id="floatingnumber"
                placeholder="number"
              />
              <label for="floatingnumber">Phone Number</label>
            {errors.login_number && touched.login_number ? (
              <div className=" text-danger ">{errors.login_number}</div>
            ) : null}
            </div>
            <br />
            <div class="mb-3">
          <label for="formFile" class="form-label">Select any Img </label>
          <Field class="form-control user-img-input"   name="user_img"  type="file" accept="image/*"  id="formFile" />
          {errors.user_img && touched.user_img ? (
              <div className=" text-danger ">{errors.user_img}</div>
            ) : null}
            </div>

            <button type="submit" className="btn btn-primary">SingnUp</button>
            </Form>
            )}  
        </Formik>
      </div>
    </>
  );
};

export default SingnUp;
