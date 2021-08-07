import React,{useState, useEffect} from 'react'
import ReactDom from "react-dom";
import {BrowserRouter, Redirect, Route,Switch} from 'react-router-dom'
import Todo from './components/todo';
import Login from './components/login'
import SingnUp from './components/signup'
import Layout from './components/layout'
import {auth} from './components/firebase'
import VerificationPage from './components/verificationpage'
import Forgotpassword from './components/forgotpassword'
import UserProf from './components/userProf'


 

 const App = () => {
     const [user, setUser]=useState(null)
useEffect(()=>{
  
  auth.onAuthStateChanged(user=>{
    if(user){
    setUser(user)
    console.log('Test', user)
  }
    else{
    setUser(user)
    console.log('Test', user)

  }
  })
  // console.log('Testing', auth.currentUser)
},[])

  return (
    <>
        <BrowserRouter>

    <Layout user={user}>
    <Switch>
      <Route exact path="/todo">
        <Todo user={user}/>
      </Route>
      <Route exact path="/login">
        <Login user={user}/>
      </Route>
    
      <Route exact path="/signup">
        <SingnUp />
      </Route>
      <Route exact path="/verificationpage">
        <VerificationPage />
      </Route>
      <Route exact path="/forgotpassword">
        <Forgotpassword />
      </Route>
      <Route exact path="/userProf">
        <UserProf user={user} />
      </Route>
      <Redirect to="/signup"/>
      </Switch>
      </Layout>
    
      </BrowserRouter>
    </>
  )
}

export default App;
