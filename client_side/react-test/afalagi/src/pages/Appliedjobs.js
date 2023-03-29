
import { useState , useEffect , useContext} from "react"
import { httpGetAppliedJob, httpGetAppliedJobs } from "../requests/Requests.js"
import { JobContext } from "../components/Contexts"





export default function Appliedjobs(){
   
    const[jobs , setJobs] = useState([])
    useEffect(()=>{
        async function fetcher(){
            const response = await httpGetAppliedJobs()
       
            setJobs(response)
          
        } 
        fetcher()
    }, [])

 

   
    return(
        <>

            {jobs &&         <JobContext.Provider value= {jobs}>
        <Component  />

        </JobContext.Provider>}


        

        </>
    )
}


function Component(){

   


    return(
        <div className="container-fluid">
            
            
            <table className = "table table-striped">
                <thead>
                    <tr>
                            <td>Job Title</td>
                            <td> Company </td>
                            <td>  Status </td>
  
                    </tr>

                </thead>

                <FetchJob />
                  
               
            </table>
            
            
            
            
             </div>
          )}


function FetchJob(){
    const jobs = useContext(JobContext)
    return(
        jobs.map(
            jobId => <Jobdetail jobId = {jobId}  key = {jobId}/>
        )
    )
}


function Jobdetail({jobId}){
    const[job , setJob] = useState({})
    useEffect(
        ()=>{
            const fetcher = async ()=>{
               const response =  await httpGetAppliedJob(jobId) 
               setJob(response[0])
            }

            fetcher()
        } , []
    )

  

    return(
        <>
     <Tablebody job = {job} />
        </>
    )
}





function Tablebody({job}){
   
  
    return(
        <tbody key = {job.id}>
       

                <tr >
                <td> {job.title} </td>
                <td> {job.companyName} </td>
                <td> {job.status}  </td>
                </tr>
     
        </tbody>
    )
}





