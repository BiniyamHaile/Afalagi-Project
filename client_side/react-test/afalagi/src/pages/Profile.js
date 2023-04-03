import { useState , useEffect } from "react"
import { httpGetProfile, httpUpdateProfile } from "../requests/Requests"
import "../styles/signup.css";
import "../styles/profile.css";
import jwtDecode from 'jwt-decode';
export function Profile(){
    const[user , setUser] = useState()
    useEffect(()=>{
        const fetcher = async ()=>{
            const response = await httpGetProfile()
            
            setUser(response)

        }
        fetcher() 
    } , [])


    return(
        <>
        {user &&  <Component user = {user} /> }
        </>
    )
}


function Component({user}){
    const[firstName , setFname] = useState(user.firstName)
    const[lastName , setLname]= useState(user.lastName)
    const[email , setEmail] = useState(user.email)
    const[description , setDescription] = useState(user.description)
    const[department , setDepartment] = useState(user.department)
    const[phone , setPhone] = useState(user.phone)


    const[response , setResponse] = useState()
    const[tried , setTried] = useState(false)
    async function handleClick(){
       
        const  body =   { firstName , lastName , email , description , department , phone}
        const result = await  httpUpdateProfile(body)
        setResponse(result.ok)
        if(result.ok === true){
           
                const decoded = jwtDecode(result.token)
                localStorage.clear()
                
                localStorage.setItem("name" , decoded.name)
                localStorage.setItem("email" , decoded.email)
                localStorage.setItem("token" , result.token)
                localStorage.setItem("id" , decoded.id)
                
        
        
    }}

    console.log(response)
    return(

        <div>
        <div className="post bg-light shadow-lg mt-5 container">

       
      

        <div className = "inputs-container  "> 
            <div className="input-container ">
                <label className="position-relative">First name</label>
                <input className="form-control" type= "text" value = {firstName} onChange = {(e)=>setFname(e.target.value)} />
            </div>
            <div className="input-container ">
                <label className="position-relative">Last name </label>
                <input className="form-control" type= "text" value = {lastName} onChange = {(e)=>setLname(e.target.value)} />
            </div>

   

            <div className="input-container ">
                <label >Department </label>
                <select className=" textarea" name = "department"  value={department}  onChange={(e)=>setDepartment(e.target.value)}>
                        
                        
                        <option value = "IT" >IT</option>
                        <option value = "Law">Law</option>
                        <option value = "Psychology">Psychology</option>
                        <option value = "Health">Health</option>
                        <option value = "Graphics">Graphics Designer</option>
                    </select>
            </div>


            <div className="input-container ">
                <label className="position-relative">Phone </label>
                <input className="form-control" type= "text" value = {phone} onChange = {(e)=>setPhone(e.target.value)} />
            </div>
            <div className="form-group  input-container">
                <label className="position-relative">Email </label>
                <input className="form-control" type= "text" value = {email} onChange = {(e)=>setEmail(e.target.value)} />
            </div>

            <div>
            <div className="form-group ">
            <label className="position-relative">Description :  </label>
                <textarea  className="form-control" rows= '5' value = {description} onChange = {(e)=>setDescription(e.target.value)} />
            </div>
            </div>


            </div>


           
            <div  className= {response ===true ?   "d-flex justify-content-center  align-items-center mt-4" : "d-flex justify-content-end  align-items-center mt-4"}> 
              
              
                 <button onClick = {()=>{handleClick()}} className = {response !=null  ? "d-none" : "btn btn-primary p-md-3 me-5  btn-lg"} > <i className="bi bi-pen"></i> Submit changes </button>
                <div className= {response === true ? "d-block" : "d-none"}> <p className="text-success lead text-center">  Submitted! </p> </div>
                <div className= {response === false ? "d-block" : "d-none"}>  <p className="lead text-danger"> This email address is used by another user. </p> </div>
                <div className= {response === "error" ? "d-block" : "d-none"}>  <p className="lead danger"> Can't perform the requested action.  </p> </div>
          </div>
    

          
          

        


             </div>


                
    
    
    
    </div>



    )
}