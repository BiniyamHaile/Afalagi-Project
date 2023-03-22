import {useState} from 'react';
import "../../styles/initial/header.css"

export default function Header(){
    const [scroll , setScroll]  = useState(0)
    const [isFixed , setFixed] = useState(false)
    function clickHandler(path){
        window.location.href = path
    }




    function handleScroll(){
        console.log(window.scrollY)
     window.scrollY > 107 ? setFixed(true) : setFixed(false)

    }
    
    window.addEventListener("scroll"  , handleScroll)


    return(

        <div className = {`${isFixed ? "headerContainer bg-primary fixed"  : "headerContainer"}`}>
           <div > <h1><span className = "logo">አ</span>falagi</h1> </div>
           <div>
            <button className={isFixed ? "btn btn-link text-light d-none d-md-inline": "btn btn-link d-none d-md-inline "}>ABOUT US</button>
            <button className={isFixed ? "btn btn-link text-light d-none d-md-inline": "btn btn-link d-none d-md-inline"}>CONTACT US</button>
            <button onClick = {()=>{clickHandler("/login")}} className={isFixed ? "btn btn-link text-light d-inline d-md-none": "btn  btn-link d-inline d-md-none"}>Login</button>
            <button onClick = {()=>{clickHandler("/signup")}} className={isFixed ? "btn btn-link text-light d-inline d-md-none": "btn  btn-link d-inline d-md-none"}>Sign up</button>
            <button onClick = {()=>{clickHandler("/login")}} className = "btn text-dark btn-warning fs-lg p-2 m-2 hover-shadow d-none d-md-inline">Login</button>
            <button onClick = {()=>{clickHandler("/signup")}}  className = "btn text-dark btn-warning fs-lg p-2 hover-shadow d-none d-md-inline">Sign up</button>
           </div>
        </div>


    )
}