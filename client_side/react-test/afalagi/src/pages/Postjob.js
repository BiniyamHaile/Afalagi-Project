import "../styles/signup.css";
import { useState } from "react";
import { URL } from "../requests/Requests";
export default function Postjob(){


    
    return(
        <div>
        <h1 className="text-center lead mt-4">POST YOUR JOBS HERE.</h1>
        <Form/>
        </div>
    )
}


function Form(){

    return(

        <div className="inputs-container">
            <form>
               
                <Inputs/>     
               
           
            </form>
                       

        </div>

    )
}


function Inputs(){
    const[title , setTitle] = useState("")
    const[department , setDepartment] = useState("IT")
    const[description , setDescription] = useState("")
    const[location , setLocation] = useState("")
    const[deadline, setDeadline] = useState("")
    const[salary , setSalary] = useState("")





    async function handleSubmit(e){    
        e.preventDefault() ;
        
        
        const response = await fetch(`${URL}/job/postjob` , {
          method : "POST" , 
          headers : {
            "Content-Type" : "application/json" , 
            'x-access-token'  : localStorage.getItem('token')
          } , 
          body : JSON.stringify({
            title, department , description , location , deadline , salary
          })
        }).then(response=> response.json()).then(data => data);

        if(response.created){
            window.location.href = "/chome/jobsposted"
        }
        

        
          
          
          
          
         }
















    return(
        <div className="post bg-light shadow-lg">

      
        <div className = "inputs-container  "> 
                <div className="input-container ">
                <label htmlFor="title">
                    Title : 
                </label>
                <input name = "title" type = "text" value = {title} onChange ={(e)=>{setTitle(e.target.value)}} placeholder = "job title" required  />
                </div>



    
    
                 <div className="input-container">
                    <label htmlFor="department">
                        Department : 

                    </label>

                    <select name = "department" defaultValue={"IT"} onChange={(e)=>setDepartment(e.target.value)}>
                        <option value = "IT" >IT</option>
                        <option value = "Law">Law</option>
                        <option value = "Psychology">Psychology</option>
                        <option value = "Health">Health</option>
                        <option value = "Graphics">Graphics Designer</option>
                    </select>
                </div>
    
    
                <div className="input-container">

                <label htmlFor="description">
                    Description : 
                    </label>
                    <textarea value = {description} onChange = {(e)=>{setDescription(e.target.value)}}>
                        Write a short description about your job
                    </textarea>
                </div>

    
    
                <div className="input-container">
                    

                <label htmlFor="location">
                    Location
                    </label>
                    <input value={location} onChange = {(e)=>{setLocation(e.target.value)}} type = "text" placeholder="Job location" />

                </div>
    
    
                <div className="input-container">
                     <label htmlFor="deadline">
                    Deadline : 
                </label>
                    <input value = {deadline} type = "date" onChange = {(e)=>{setDeadline(e.target.value)}} />
                </div>
    
    
    
                <div className="input-container">
                <label htmlFor="salary">
                    Salary
                    </label>
                    <input type = "text" placeholder="optional" value = {salary} onChange = {(e)=>{setSalary(e.target.value)}}  />
                </div>
                
       
        </div>
          <div className="d-flex align-items-center justify-content-center mt-5 ">
          <input className="btn btn-secondary btn-lg border" type = "submit" value = "Post" onClick={handleSubmit} />
          </div>

        </div>
    )
}