
import { useState , useEffect , useContext} from "react"
import { httpGetAppliedJobs } from "../requests/Requests.js"
import { JobContext } from "../components/Contexts"





export default function Appliedjobs(){
   
    const[jobs , setJobs] = useState([])
    useEffect(()=>{
        async function fetcher(){
            const response = await httpGetAppliedJobs()
       
            setJobs(response)
            console.log(jobs)
        } 
        fetcher()
    }, [])

    console.log("applied jobs....")
    console.log(jobs)

   
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

                
                    <Tablebody />
               
            </table>
            
            
            
            
             </div>
          )}

function Tablebody(){
    const jobs = useContext(JobContext)
    console.log(jobs)
    return(
        <tbody>
        {jobs.map(job=>


                <tr key = {job.id}>
                <td> {job.title} </td>
                <td> {job.companyName} </td>
                <td> {job.status}  </td>
                </tr>
        )}
        </tbody>
    )
}