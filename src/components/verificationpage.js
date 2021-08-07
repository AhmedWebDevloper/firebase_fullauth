import React from 'react'
import {Link} from 'react-router-dom'

const Verificationpage = () => {
    return (
        <>
         <div className="text-center"><p>Please verify your acount first <br />if you verified you acount then click <Link to="/login" ><b>Login</b></Link> </p></div>   
        </>
    )
}

export default Verificationpage
