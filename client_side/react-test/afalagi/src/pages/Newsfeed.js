import "../styles/components/newsfeed.css"
import Sidebar from "../components/Sidebar";
import { useState , useEffect } from "react";
import { httpApplyToJob } from "../requests/Requests.js";
import { URL } from "../requests/Requests.js";
import { httpGetNotificationCount } from "../requests/Requests.js";

export default function Newsfeed(){
    const [jobs , setJobs] = useState([])
    const [count , setCount]= useState()
    useEffect( 
        ()=>{
            fetch(`${URL}/job/departmentjob` , {
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            }).then(response => response.json()).then(
                (data)=>{
                    if(data){
                        console.log(data)
                        setJobs(data)
                       
                    }
                }
            )

            async function fetcher(){
                const notification = await fetch(`${URL}/freelancer/ncount`  , {
                    headers : {"x-access-token" : localStorage.getItem("token")}
                }).then(response => response.json()).then(data => data)
                setCount(notification)
                console.log(notification)

            }

            fetcher()
        }
        , [])


    

        return(
            <div className="container ">
               <div className="row">
                    <div className=" d-none d-md-block col-md-2 col-lg-3  position-relative p-0"> <p className="invisible">sidebar</p>  <div className="side-bar"><Sidebar setJobs = {setJobs} /></div> </div>
                    <div className="col-md-9 col-lg-8 ms-5"> {jobs.length > 0 ?  <Components jobs = {jobs}  /> : 
                    <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>} </div>
               </div>
            </div>
        )
}



export function Components({jobs }){
    const handleApply = async (job_id)=>{
       
        const result  = await httpApplyToJob(job_id)
        
    }
    return(
        <div className="joblist" >
            {jobs.map(job=>
               <div key = {job._id} className = "bg-light m-2 border">
                <p className="text-center fw-bold title"> {job.title} </p>
                <p className=" company ms-md-5"> Company :  {job.companyName} </p>
                <p className=" fs-italics department ms-md-5"> Department :  {job.department} </p>
                <p className="ms-md-5 deadline" > Deadline :  <span>{new Date(job.deadline).toLocaleDateString()}</span> </p>
                
                <p className = "description ms-md-3"> <p>Description : </p> <span className="ms-2"> {job.description} </span> </p>

                <button onClick = {()=>{
                    
                    handleApply(job.id)}} className="btn  btn-lg  apply  shadow ">Apply</button>
                </div>

            )}
        </div>
    )
}