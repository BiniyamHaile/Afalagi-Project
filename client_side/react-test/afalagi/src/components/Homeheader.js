import "../styles/components/Homeheader.css"
import profile from "../images/img-1.jpg"
import {Logout} from "./Logout"
import { createContext  , useContext, useState} from "react"
import { NavLink , Link } from "react-router-dom"
import { httpGetNotificationCount, httpPostRequest } from "../requests/Requests"
import Jobsearch from "../pages/Jobsearch"
const UserContext = createContext({})



export default function Homeheader({user , count}){
  
    
    

    return(
              <UserContext.Provider value = {[user, count]}>
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
              </UserContext.Provider>
            )   
   }



function Form(){
  const[results , setResults] = useState([])
  const[query , setQuery] = useState("")
  
  const handleClick = async (e)=>{
    e.preventDefault();
    console.log(e.target.value)
    
    const response = await httpPostRequest("/job/searchjob" , {title : query})
    setResults(response)
   


  }
 return(
    <form className="form-inline my-2 my-lg-0 d-flex">
          <input className="form-control mr-sm-2" type="search" placeholder={`search job`} onChange = {(e)=>setQuery(e.target.value)}  />
          <button className="btn btn-outline-success ms-2" type="submit" onClick={handleClick} >Search</button>
          
  </form>
 )
}





function List(){


  const [user] = useContext(UserContext)
  return(
      <ul className="navbar-nav me-auto mb-2 mb-lg-0  w-50 justify-content-around ms-5">
      <li className="nav-item">
        <Navigation path =  "/freelancer/" aria = {true} value = "Home" /> 
       </li>
      <li className="nav-item">
      
        <Navigation path = {`/freelancer/appliedjobs/${user.id}`} value = "Applied Jobs" />
      </li>
      <li className="nav-item">
        <Notification path = "/freelancer/notification"   value= "Notifications"  />
      </li>

      <li className="nav-item d-lg-none">
        <Link to = "" className="dropdown-item mt-1" aria-current = "" >Profile</Link>
        </li>
      
      <li className="nav-item d-lg-none mt-1 " aria-current = "">
        <Logout className="all-unset w-100 mt-1 "/>
      </li>

      <li className="d-sm-none d-lg-block">
          <Dropdown />
      </li>



    </ul>
  )
}


function Navigation({path , aria , value}){
 
 
  return(
    <>
    <NavLink to = {path}  className = "nav-link" aria-current = {aria ? "page" : ""}>  {value}
      </NavLink>
    
    </>
  )
}

function Notification({path , aria , value}){
  const [user , count] = useContext(UserContext)
  
  const [num , setNum] = useState(count)
  
  console.log(`count is ${count}`)
  console.log(`num is ${num}`)
  return(
    <>
     <NavLink to = {path}  className = "nav-link " aria-current = {aria ? "page" : ""}>
     <div onClick={()=>setNum(0)} className=" header-contain">  {value} <span className={num > 0 ? "count" : "d-none"}>{num > 0 ? num : ""} </span> </div>
      </NavLink>
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

function Dropdown(){

  return(
    <div>
          <div className="dropdown ">
            <div className="d-inline"><img src= {profile} alt = "..." className="photo" /></div>
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              {localStorage.getItem("name")}
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><Link to = "" className="dropdown-item" >Profile</Link></li>
              <li ><Logout className="all-unset dropdown-item w-100 "/></li>
              
            </ul>
    
          </div>


        
       
        
    </div>
  )
}