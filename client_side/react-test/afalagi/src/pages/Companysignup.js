import "./../styles/signup.css"
import { useState } from 'react';

export default function Companysignup() {
 
  const [password , setPassword] = useState("");
  const [email , setEmail] = useState("");
  const [name , setName] = useState("")



  async function handleSubmit(e){
   
    
    e.preventDefault() ;
     
    const response = await fetch('http://localhost:3000/company/signin', {
      method : "POST" , 
      headers : {
        "Content-Type" : "application/json"
      } , 
      body : JSON.stringify(
        {
          name , email , password
        }
      )
    })

      const data = await response.json()
      console.log(`data is ${data.status}`)
    if(data.ok === true){
     console.log("you are signed in")
     window.location.href  = "/login"
    }     
    
  }


  return (
  <div className='sign-container '>
   <form onSubmit = {handleSubmit} className = "d-flex flex-column shadow-lg">

    <div className='d-flex input-container  justify-content-between  mx-auto mb-4 mt-4'>
    <label for = "cname">Company Name:  </label>
    <input id = "cname" value = {name} onChange = {(e)=>{setName(e.target.value)}}/>
    </div>

    <div className='d-flex  input-container justify-content-between  mx-auto mb-4 '>
    <label for = "cemail">Email  : </label>
    <input id = 'cemail' value = {email} onChange = {(e)=>{setEmail(e.target.value)}} />
    </div>
    
   
    <div className='d-flex input-container justify-content-between  mx-auto mb-4'>
    <label for = "cpassword">Password :</label>
    <input id = 'cpassword' value = {password} onChange = {(e)=>{setPassword(e.target.value)}} />
    </div>
    
  
    
    <div className='d-flex  input-containerjustify-content-center  mx-auto mb-4 '>
    <input type = "submit" value = "sign in" className='mx-auto btn btn-lg border shadow-lg bg-muted'  />
    </div>


   </form>
  
  </div>
  );
}


