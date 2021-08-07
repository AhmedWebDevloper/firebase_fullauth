 
import React,{useState} from 'react';
import { auth } from './firebase';

const Forgotpassword = () => {
const [emailinput, setemailinput] = useState(null)
const [emailfill, setemailfill] = useState(false)
const handlesubmit= (e)=>{
e.preventDefault();

// console.log(emailinput);
auth.sendPasswordResetEmail(emailinput)
.then(()=>{
    console.log("Passwordl reset email send ")
    setemailfill(true)
})
.catch(err =>{
    console.log(err)
})

// alert("We send you an Password reset mail , please check it or Click on this OPen Email Link")

}




    return (
        <>
 <div className="m-5 border-1 border-primary w-75">
     <form action="#" onSubmit={handlesubmit}>
     
 <div class="form-floating">
                <input
                  type="email"
                  name="email"
                  class="form-control "
                  id="floatingEmail"
                  placeholder="Enter Email"
                  value={emailinput}
                  required={true}
                  onChange={(e)=>setemailinput(e.target.value)}
                />
                <label for="floatingEmail">Enter Email</label>
               
              </div>
<br />
              <button type="submit" className="btn btn-primary">Submit</button>
     
     </form>

     <div className={`${emailfill ? "d-block" : "d-none"} `}>We send you an Password reset mail , please check it or <a href="https://mail.google.com/mail/u/0/" target="_blank">Click</a> on this oPen Email Link</div>
     </div>
        </>
    )
}

export default Forgotpassword
