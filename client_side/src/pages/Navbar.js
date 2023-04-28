import { NavLink  , Link } from "react-router-dom"
import {Logoutbtn} from "../components/Logout"
import "../styles/search.css"
import {useState } from "react"
export default function Navbar(){

    

        return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
                <Navtoggler/>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to = "" className="navbar-brand me-3" href="#">Afalagi</NavLink>
            <Form/>  
               
                <List/>
                 
            </div>
        </div>
        </nav>
            )   
   }




   function Form(){
    const[results , setResults] = useState(null)
    const[query , setQuery] = useState("")
   
   
  
    
   return(
      <form className="form-inline my-2 my-lg-0 d-flex" >
            <input  className="form-control mr-sm-2" type="search" placeholder={`search freelancer`} onChange = {(e)=>{
            
            setQuery(e.target.value)}
            }  />
            <Link to = {query? `/chome/search/${query}` : ""}  className="btn btn-outline-success ms-2" >Search</Link>
         
            
    </form>
   )
  }
  
  









function List(){
  return(
      <ul className="navbar-nav me-auto mb-2 mb-lg-0  w-50 justify-content-around ms-5">
      <li className="nav-item">
        <Navigation path =  "/chome/" aria = {true} value = "Home" /> 
       </li>
      <li className="nav-item">
      
        <Navigation path = "/chome/jobsposted" value = "Jobs Posted" />
      </li>
      <li className="nav-item">
        <Navigation path = "/chome/postjob"   value= "Post Job" />
      </li>
      <li>
          <Logoutbtn className="btn btn-secondary border shadow"/>
      </li>
    </ul>
  )
}


function Navigation({path , aria , value}){
  return(
    <>
    <NavLink to = {path}  className = "nav-link" aria-current = {aria ? "page" : ""}>{value}</NavLink>
    </>
  )
}

function Navtoggler(){
        return(
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        )
}