import "../styles/initial/postedjobs.css"
import { useEffect  , useState} from "react"
import { httpGetAppliedPeople } from "../requests/Requests.js"
import Appliedjobs from "./Appliedjobs"
import { Link } from "react-router-dom"
import { httpCloseJob } from "../requests/Requests.js"
import Appliedpeople from "./Appliedpeople"
import { URL } from "../requests/Requests.js"
export default function Jobsposted(){
    const [close , setClose] = useState(false)
    const [jobs , setJobs] = useState([])
   
    useEffect(
     ()=>{
        
        fetch(`${URL}/job/postedjobs` , {
            headers : {
                'x-access-token' : localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((data)=>{ 
            console.log(data)
            setJobs(data)})
     }
        ,[close])
        


        async function handleClose( job){
        


            const data = await httpCloseJob(job.id)
            job.status = data.status
            setClose(!close) }

    return(
        <>
        <h2 className="text-secondary f-italics text-center">list of jobs from {localStorage.getItem('name')} </h2>
       
     
            <PostedJobs jobs = {jobs} handleClose = {handleClose}/>
  
        
        </>
    )
}




function PostedJobs({jobs , handleClose}){
 
    return (
        <div className="bg-light ">
            {jobs.map(job=>
                <div key = {job._id} className = "job row" >
                  <div className=" col-md-6">
                  <h3> {job.title} </h3>
                  <p className = "fs-italics"> {job.status}  </p> 
                   <p> description : <br/> {job.description} </p>  
                    </div>
                    <div className="col-md-4">
                        <p className="fs-italics">  {job.personsApplied.length} people applied </p>
                        <Link to = {`appliedpeople/${job.id}`}  >  see applied people </Link>
                        <button onClick = {()=>{handleClose(job)}} className="btn btn-primary d-block mt-3"><i className="bi bi-x-square"></i> Close job </button>
                    </div>
                                 
                    </div>
            )}
        </div>
    )
}