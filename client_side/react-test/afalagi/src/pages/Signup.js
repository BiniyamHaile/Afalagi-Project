
import { useState } from 'react';
import "../styles/signup.css";
import "../styles/login.css"
import { URL } from '../requests/Requests';

export default function Signup() {
 
  const [password , setPassword] = useState("");
  const [email , setEmail] = useState("");
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] =  useState("")
  const [department  , setDepartment] = useState("IT")
  const [description , setDescription] =  useState("");
  const [phone , setPhone] =  useState("")
  const [experience , setExperience]=  useState(0)
  const [location , setLocation] = useState("")



  async function handleSubmit(e){
   
    
    e.preventDefault() ;
     console.log({
      firstName ,lastName ,  password , email , phone , department  ,description , experience  , location
    })
    const response = await fetch(`${URL}/freelancer/signin`, {
      method : "POST" , 
      headers : {
        "Content-Type" : "application/json"
      } , 
      body : JSON.stringify(
        {
          firstName ,lastName ,  password , email , phone , department  ,description , experience  , location
        } ),

   
     
    })

      const data = await response.json()
      console.log(`data is ${data.status}`)
    if(data.ok === true){
     console.log("you are signed in")
     window.location.href  = "/login"
    }     
    
  }


  return (
  <div className =  "sign-container d-flex flex-direction-column align-items-center shadow-lg pb-5">
  
   <form onSubmit = {handleSubmit} className = " form-container container-fluid "> 

      <div className = 'container row'>



      <div className='inputs   '>
   
    <input type= "text" value = {firstName} onChange = {(e)=>{setFirstName(e.target.value)}} required />
    <label>First name :  </label>
    </div>


    <div className='inputs  '>
   
    <input type= "text" onChange = {(e)=>{setLastName(e.target.value)}} required />
    <label >Last name : </label>
    </div>

    <div className='inputs  '>
   
    <input type = "email" onChange = {(e)=>{setEmail(e.target.value)}} required/>
    <label>Email  : </label>
    </div>


    
   <div className='inputs  '>
   
   
    <input type = "text"  onChange = {(e)=>{setPhone(e.target.value)} } required/>
    <label >Phone : </label>
   </div>


    <div className='inputs  '>
    
    <input type = "password" onChange = {(e)=>{setPassword(e.target.value)}} required />
    <label>Password : </label>
    </div>

   

     
    

  

    <div className='inputs  '>
    <input type  = "text"   onChange = {(e)=>{setExperience(e.target.value)}} required/>
    <label>Experience  :</label>
    
    </div>
   

    <div className='inputs  '>
    <input  type = "text" onChange = {(e)=>{setLocation(e.target.value)}} required/>
    <label>Location :  </label>
   
    </div>
    

    <div className='input-container  '>
    <label className = "padding"> Department :  </label>
    <select name = "department" defaultValue={"IT"} onChange={(e)=>setDepartment(e.target.value)} className = "d-block" >
                        <option value = "IT" >IT</option>
                        <option value = "Law">Law</option>
                        <option value = "Psychology">Psychology</option>
                        <option value = "Health">Health</option>
                        <option value = "Graphics">Graphics Designer</option>
                    </select>
    </div>

    <div className='input-container  '>
      <label className='padding' >Description : </label>
     <textarea type = "text" onChange={(e)=>{setDescription(e.target.value)}} required></textarea>  
    
    </div>

    <div className=' inputs'>
      <input type = "submit" value = "sign up" className='mx-auto btn btn-lg border mt-2 sign-up'  required />
      </div>
      
      
    </div>
    
  


   </form>
  
  </div>
  );
}


