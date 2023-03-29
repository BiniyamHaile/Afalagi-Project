import "../styles/initial/postedjobs.css"
import { useEffect  , useState} from "react"
import { Link } from "react-router-dom"
import { httpCloseJob, httpGetPostedJob, httpGetPostedJobs } from "../requests/Requests.js"
import { URL } from "../requests/Requests.js"
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
            <PostedJobs jobId = {jobId} />
            
            )}
        </>
    )
}



function PostedJobs({jobId}){
    const[job , setJob] = useState()
    useEffect(
        ()=>{
            const fetcher = async ()=>{
                const result = await httpGetPostedJob(jobId)
                setJob(result)
            }
            fetcher()
        } , []
    )


    console.log("job is  ......")
    console.log(job)

    return (
        <div className="bg-light ">
            
               { job&& < div key = {job._id} className = "job row" >
                  <div className=" col-md-6">
                  <h3> {job.title} </h3>
                  <p className = "fs-italics"> {job.status}  </p> 
                   <p> description : <br/> {job.description} </p>  
                    </div>
                    <div className="col-md-4">
                        <p className="fs-italics">  {job.personsApplied.length} people applied </p>
                        <Link to = {`appliedpeople/${job.id}`}  >  see applied people </Link>
                   <Button jobId = {job.id} status = {job.status}/>
                    </div>
                                 
                    </div>
}
        </div>
    )
}


function Button({jobId  , status}){
    const[jobStatus , setStatus] = useState(status)
    useEffect(()=>{

    } , [])
    async function handleClose( jobId){
        


        const data = await httpCloseJob(jobId)
        
        setStatus(data.status) }

    console.log(jobStatus)
    console.log(status)
    return(



        <button onClick = {()=>{
                            
            if(jobStatus === "Open"){
                handleClose(jobId)
            }
            
            }} className={jobStatus === "Open" ? "btn btn-primary d-block mt-3" : "btn  d-block mt-3 disabled"}><i className="bi bi-x-square"></i> Close job </button>
    )





}

// function PostedJobs({jobs , handleClose}){
 
//     return (
//         <div className="bg-light ">
//             {jobs.map(job=>
//                 <div key = {job._id} className = "job row" >
//                   <div className=" col-md-6">
//                   <h3> {job.title} </h3>
//                   <p className = "fs-italics"> {job.status}  </p> 
//                    <p> description : <br/> {job.description} </p>  
//                     </div>
//                     <div className="col-md-4">
//                         <p className="fs-italics">  {job.personsApplied.length} people applied </p>
//                         <Link to = {`appliedpeople/${job.id}`}  >  see applied people </Link>
//                         <button onClick = {()=>{
                            
//                             if(job.status === "Open"){
//                                 handleClose()
//                             }
                            
//                             }} className={job.status === "Open" ? "btn btn-primary d-block mt-3" : "btn  d-block mt-3 disabled"}><i className="bi bi-x-square"></i> Close job </button>
//                     </div>
                                 
//                     </div>
//             )}
//         </div>
//     )
// }