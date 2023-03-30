import "../styles/components/Homeheader.css"
import "../styles/components/searchStyle.css"
import {Logout} from "./Logout"
import { createContext  , useContext, useEffect, useState} from "react"
import { NavLink , Link , Navigate } from "react-router-dom"
import {  httpGetNotificationCount, httpPostRequest } from "../requests/Requests"


const UserContext = createContext({})



export default function Homeheader({user , count}){
  const[isFixed , setFixed] = useState(false)
    
  function handleScroll(){
    
    window.scrollY > 107 ? setFixed(true) : setFixed(false)

   }
   
   window.addEventListener("scroll"  , handleScroll)



    return(
              <UserContext.Provider value = {[user, count]} >
                <div className= "">
                <nav className={isFixed ? "ps-0 navbar navbar-expand-lg navbar-light bg-info fixed w-100" : "navbar navbar-expand-lg navbar-light bg-light"} >
                    <div className="container-fluid  nav-container">
                    <div  className=" contain d-flex">
                    <NavLink to = "" className="navbar-brand" href="#">Afalagi</NavLink>
                         <span className="d-none d-lg-block"> <Form/>  </span> 
                         <Navtoggler/>
                    </div>
                    
                        <div className="collapse navbar-collapse container  nav-contain d-lg-flex justify-content-end " id="navbarTogglerDemo01">
                        
                                  
                                   
                                  <span className="d-lg-none"> <Form/>  </span>
                                    <List/>
                            
                        </div>
                    </div>
                </nav>
                </div>
              </UserContext.Provider>
            )   
   }





 
  
   


   function Form(){
   
    const[query , setQuery] = useState("")
   
   
   
   return(
      <form className="form-inline my-2 my-lg-0 d-flex" >
            <input  className="form-control mr-sm-2" type="search" placeholder={`search job`} onChange = {(e)=>{
            
            setQuery(e.target.value)}
            }  />
            <Link to = {query? `/freelancer/search/${query}` : ""}  className="btn btn-outline-success ms-2" >Search</Link>
         
            
    </form>
   )
  }








 





function List(){


  const [user] = useContext(UserContext)
  return(
      <ul className="navbar-nav  mb-2 mb-lg-0  w-75 justify-content-between  ms-5">
      <li className="nav-item">
        <Navigation path =  "/freelancer/" aria = {true} value = "Home" /> 
       </li>
      <li className="nav-item">
      
        <Navigation path = {`/freelancer/appliedjobs`} value = "Applied Jobs" />
      </li>
      <li className="nav-item">
        <Notification path = "/freelancer/notification"   value= "Notifications"  />
      </li>

      <li className="nav-item d-lg-none">
        <Link to = "/freelancer/profile" className="dropdown-item mt-1" aria-current = "" >Profile</Link>
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
  // const [user , count] = useContext(UserContext)
  
  const [num , setNum] = useState(0)
  
  useEffect(
    ()=>{
        const fetcher = async ()=>{
          const result = await httpGetNotificationCount()

          setNum(result)
        }

        fetcher()
    } , []
  )
  
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
          <div className="dropdown d-none d-lg-block">
            <div className="d-inline fw-bold border photo-container">
              <div  className = "photo" >
              <h1> {localStorage.getItem("name").slice(0 , 1)}</h1>
                
              </div>
              
                </div>
            <a className="btn btn-secondary dropdown-toggle name" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              {localStorage.getItem("name")}
            </a>

           
           

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><Link to = "/freelancer/profile" className="dropdown-item" >Profile</Link></li>
              <li ><Logout className="all-unset dropdown-item w-100 "/></li>
              
            </ul>
    
          </div>


        
       
        
    </div>
  )
}