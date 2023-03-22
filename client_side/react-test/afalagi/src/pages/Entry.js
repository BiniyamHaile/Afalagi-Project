import Header from "./initial/Header"
import "../styles/initial/header.css";
import Description from "./initial/Description";
import { Joblists } from "./initial/Joblists";
import Cards from "./initial/Cards";
import About from "./initial/About";
import { NavLink } from "react-router-dom";


export default function Entry(){


    
    return(
        <div >



        <div className = "firstContainer shadow">
           <Header/>
        <div className = "top mt-5 description">   <Description/></div>
        <NavLink to={"/signup"} className = "btn btn-lg btn-secondary trigger"  >Get Started</NavLink>
        </div>
        <Joblists/>
       <Cards/>

        <div className = "description">
        <About/>

        </div>


        </div>
    )
}