import { useState , useEffect } from "react"
import { httpGetProfile, httpUpdateProfile } from "../requests/Requests"
import "../styles/signup.css";
import "../styles/profile.css"
export function Profile(){
    const[user , setUser] = useState()
    useEffect(()=>{
        const fetcher = async ()=>{
            const response = await httpGetProfile()
            console.log(response)
            setUser(response)

        }
        fetcher()
    })


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

    async function handleClick(){
       
        const  body =   { firstName , lastName , email , description , department , phone}
        const response = await  httpUpdateProfile(body)

        console.log(response)
    }

    return(
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


            <div  className="d-flex justify-content-end  align-items-center mt-4"> 
            <button onClick = {()=>{handleClick()}} className = "btn btn-primary p-md-3 me-5  btn-lg"> <i class="bi bi-pen"></i> Submit changes </button>
             </div>
          

        


    


     
    
    
    
    </div>
    )
}