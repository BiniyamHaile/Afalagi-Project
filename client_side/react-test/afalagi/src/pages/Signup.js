
import { useState } from 'react';
import "../styles/signup.css"

export default function Signup() {
 
  const [password , setPassword] = useState("");
  const [email , setEmail] = useState("");
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] =  useState("")
  const [department  , setDepartment] = useState("")
  const [description , setDescription] =  useState("");
  const [phone , setPhone] =  useState("")
  const [experience , setExperience]=  useState(0)
  const [location , setLocation] = useState("")



  async function handleSubmit(e){
   
    
    e.preventDefault() ;
     console.log({
      firstName ,lastName ,  password , email , phone , department  ,description , experience  , location
    })
    const response = await fetch('http://localhost:3000/freelancer/signin', {
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
  <div className =  "sign-container d-flex flex-direction-column align-items-center">
  
   <form onSubmit = {handleSubmit} className = "shadow-lg form-container "> 

      <div className = 'inputs-container'>



      <div className='input-container border '>
    <label htmlFor="fname">First name :  </label>
    <input name="fname" id="fname" value = {firstName} onChange = {(e)=>{setFirstName(e.target.value)}}  />
    </div>


    <div className='input-container border'>
    <label htmlFor = "lname">Last name : </label>
    <input value = {lastName} onChange = {(e)=>{setLastName(e.target.value)}}  />
    </div>

    <div className='input-container border'>
    <label htmlFor = 'email'>Email  : </label>
    <input id = 'email' value = {email} onChange = {(e)=>{setEmail(e.target.value)}} />
    </div>


    
   <div className='input-container border'>
   <label >Phone : </label>
    <input value={phone}  onChange = {(e)=>{setPhone(e.target.value)} }/>
   </div>


    <div className='input-container border'>
    <label>Password : </label>
    <input value = {password} onChange = {(e)=>{setPassword(e.target.value)}} />
    </div>


    <div className='input-container border'>
    <label> Department :  </label>
    <select name = "department" defaultValue={"IT"} onChange={(e)=>setDepartment(e.target.value)}>
                        <option value = "IT" >IT</option>
                        <option value = "Law">Law</option>
                        <option value = "Psychology">Psychology</option>
                        <option value = "Health">Health</option>
                        <option value = "Graphics">Graphics Designer</option>
                    </select>
    </div>

     
    <div className='input-container border'>
    <label >Description : </label>
     <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>  
    </div>




    <div className='input-container border'>
    <label>Experience  :</label>
    <input value={experience} onChange = {(e)=>{setExperience(e.target.value)}} />
    </div>


    <div className='input-container border'>
    <label>Location :  </label>
    <input value={location} onChange = {(e)=>{setLocation(e.target.value)}} />
    </div>
    


      </div>
    
    <div className='d-flex justify-content-center'><input type = "submit" value = "sign in" className='mx-auto btn btn-lg border shadow-lg bg-muted'  /></div>


   </form>
  
  </div>
  );
}


