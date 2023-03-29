import "../styles/initial/postedjobs.css"
import { useEffect  , useState} from "react"
import { Link } from "react-router-dom"
import { httpCloseJob, httpGetPostedJob, httpGetPostedJobs } from "../requests/Requests.js"

export default function Jobsposted(){
    const [close , setClose] = useState(false)
    const [jobs , setJobs] = useState([])
   
    useEffect(
     ()=>{
        const fetcher = async ()=>{
            const response = await httpGetPostedJobs()
            setJobs(response)


        }   
        fetcher()
     
     }
        ,[close])
        
     console.log(jobs)

        

    return(
        <>
        <h2 className="text-secondary f-italics text-center">list of jobs from {localStorage.getItem('name')} </h2>
       
        <ListOfJobs jobs = {jobs} />
  
        
        </>
    )
}





function ListOfJobs({jobs}){
    return(
        <>
        {jobs.map(jobId =>
            <PostedJobs jobId = {jobId} key = {jobId} />
            
            )}
        </>
    )
}



function PostedJobs({jobId}){
    const[job , setJob] = useState()
    const[jobStatus , setStatus] = useState()
    useEffect(
        ()=>{
            const fetcher = async ()=>{
                const result = await httpGetPostedJob(jobId)
                setJob(result)
                
                setStatus(result.status)
            }
            fetcher()
        } , []
    )

    
     
    

        async function handleClose( jobId){
        


        const data = await httpCloseJob(jobId)
        
        setStatus(data.status) }
 

    return (
        <div className="bg-light ">
            
               { job&& < div key = {job._id} className = "job row  p-md-4"  >
                  <div className=" col-md-6">
                  <h3> {job.title} </h3>
                  <p className = "fs-italics"> {jobStatus}  </p> 
                   <p> description : <br/> {job.description} </p>  
                    </div>
                    <div className="col-md-4 ps-md-5">
                        <p className="fs-italics">  {job.personsApplied.length} people applied </p>
                        <Link to = {`appliedpeople/${job.id}`}  >  see applied people </Link>
                   {/* <Button jobId = {job.id} status = {job.status}/> */}

                    <button onClick = {()=>{ if(jobStatus === "Open"){  handleClose(job.id)   } }} className={jobStatus === "Open" ? "btn btn-primary d-block mt-3" : "btn  d-block mt-3 disabled"}><i className="bi bi-x-square"></i> Close job </button>
                    </div>
                                 
                    </div>
}
        </div>
    )
}



