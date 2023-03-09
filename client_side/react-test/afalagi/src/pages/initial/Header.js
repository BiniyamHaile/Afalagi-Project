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
            <button className={isFixed ? "btn btn-link text-light": "btn btn-link "}>ABOUT US</button>
            <button className={isFixed ? "btn btn-link text-light": "btn btn-link "}>CONTACT US</button>


            <button onClick = {()=>{clickHandler("/login")}} className = "btn text-dark btn-warning fs-lg p-2 m-2 hover-shadow">Login</button>
            <button onClick = {()=>{clickHandler("/signup")}}  className = "btn text-dark btn-warning fs-lg p-2 hover-shadow">Sign up</button>
           </div>
        </div>


    )
}