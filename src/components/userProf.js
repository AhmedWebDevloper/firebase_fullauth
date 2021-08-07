import React, { useState, useEffect } from "react";
import { db, auth } from "../components/firebase";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import firebase from 'firebase/app'
import 'firebase/auth'


const SignupSchema = Yup.object().shape({
 newemail: Yup.string().email("Email Is Invalid").required("New Email Is Required"),
newpass: Yup.string()
.min(6, "New Password must be atleast 6 characters")
.required("New Password Is Required"),
curr_pass: Yup.string()
.min(6, "Current Password is greatenr than 5 digits")
.required("Current Password Is Required"),
});

const UserProf = (props) => {

const [userProf, setUserProf] = useState(props.user);
const [update, setupdate] = useState(null);

const history = useHistory();
useEffect(() => {
    // console.log("Yoooo----",firebase.auth().currentUser.email);
     console.log("hmmm----",userProf);
}, [])

const reauthenticate = (currentPassword) => {
    var user = userProf;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  const changeEmail =  (currentPassword, newEmail) => {
    reauthenticate(currentPassword).then(() => {
     
        
         userProf.updateEmail(newEmail).then (async () => {
        userProf.sendEmailVerification();
        history.push("./verificationpage")
            
      }).catch((error) => { console.log('Erro Reson is : ',error); });
    }).catch((error) => { console.log('Erro Reson is : ',error); });
  }


  const changePassword = (currentPassword, newPassword) => {
    reauthenticate(currentPassword).then(() => {
   
        userProf.updatePassword(newPassword).then(() => {
    

        console.log("Password updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }

  const updateprof = async (value) => {
      const {curr_pass,newemail,newpass}= value
    try {
 
    if(update==="email"){
    // console.log(curr_pass,newemail,newpass);
    changeEmail(curr_pass,newemail)
  

    }
    else if(update==="password"){
        changePassword(curr_pass,newpass)
// console.log('Passeeord changed')

    }
    


    } catch (err) {
      console.log("Erros reason is :", err);
    }
  };

  return (
    <>
      <div className="position-fixed p-2 user-prof m-5">
        <img
          src="https://i.picsum.photos/id/499/200/200.jpg?hmac=6OuceXs-LrhY-PtwyqBs_bARD8YWZEj9XuZ_ZY894Wc"
          alt=""
          className="user-img"
        />
        <br />
        <div>
          {/* <label>Name</label>&nbsp;&nbsp;<label>{userProf.displayName}</label> */}
        </div>
        <br />
        <div>
          {/* <label>email</label>&nbsp;&nbsp;<label>{userProf.email}</label> */}
        </div>
        <br />
        <div>
          {/* <label>Phone no</label>&nbsp;&nbsp;<label>{userProf.phoneNumber}</label> */}
        </div>
        <br />
    <label >Change Password/Email</label><br />




<Formik
          initialValues={{
            curr_pass: "",
            newpass: "",
            newemail: "",
             
          }}
          validationSchema={SignupSchema}
          onSubmit={(value) => {
            // console.log(value);

            // console.log(value.email_login , value.login_password);
        
            updateprof(value)
          }}
        >
          {({ errors, touched }) => (
          <Form>
    <div class="form-floating mb-3">
              <Field
                type="password"
                name="curr_pass"
                class="form-control"
                id="curr_pass"
                placeholder="Current Password"
              />
              <label for="curr_pass">Current Password</label>
            {errors.curr_pass && touched.curr_pass ? (
              <div className=" text-danger ">{errors.curr_pass}</div>
            ) : null}
            </div>

    <div class="form-floating mb-3">
              <Field
                type="password"
                name="newpass"
                class="form-control"
                id="newpass"
                placeholder="New Password"
              />
              <label for="newpass">New Password</label>
            {errors.newpass && touched.newpass ? (
              <div className=" text-danger ">{errors.newpass}</div>
            ) : null}
            </div>

    <div class="form-floating mb-3">
              <Field
                type="email"
                name="newemail"
                class="form-control"
                id="newemail"
                placeholder="Email"
              />
              <label for="newemail">New Email</label>
            {errors.newemail && touched.newemail ? (
              <div className=" text-danger ">{errors.newemail}</div>
            ) : null}
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>setupdate('email')}>Change Email </button>&nbsp;
            <button type="submit" className="btn btn-primary"
            onClick={()=>setupdate('password')} >Change Number</button>
            </Form>
            )}  
        </Formik>





      </div>
    </>
  );
};

export default UserProf;
