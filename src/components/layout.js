import React,{useEffect} from 'react'
import Header from './header'
import Footer from './footer'

const Layout = (props) => {
     const childrens = props.children;
    useEffect (()=>{
        // console.log(props.user)
     },[])
    return (
        <>
<Header user={props.user}/>
 <div >{childrens}</div>
<Footer/>
        </>
    )
}
export  default Layout