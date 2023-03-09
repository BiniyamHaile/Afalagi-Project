import "../styles/initial/postedjobs.css"
import { useEffect  , useState} from "react"
import { httpGetAppliedPeople } from "../requests/Requests.js"
import Appliedjobs from "./Appliedjobs"
import { Link } from "react-router-dom"
import Appliedpeople from "./Appliedpeople"
export default function Jobsposted(){

    const [jobs , setJobs] = useState([])

    useEffect(
     ()=>{
        
        fetch('http://localhost:3000/job/postedjobs' , {
            headers : {
                'x-access-token' : localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((data)=>{ 
            console.log(data)
            setJobs(data)})
     }
        ,[])
        
    function handleClose(id  , job){
        console.log(id)
            fetch(`http://localhost:3000/job/closejob/${id}` , {
                method : "PATCH" , 
                headers : {
                    'x-access-token' : localStorage.getItem("token")
                }
            }).then(response => response.json()).then(data => {
                job.status= data.status
            })
        
    }
    return(
        <>
        <h2 className="text-secondary f-italics text-center">list of jobs from {localStorage.getItem('name')} </h2>
       
        <table class = "table table-striped container-md">
        <thead>
           
        <tr>
        <th>Job title</th>
        <th className="d-none d-md-inherit">department</th>
        <th>Deadline</th>
        <th>People Applied</th>
        <th>Status</th>
        <th>Close</th>
        <th>See more</th>

        </tr>
        </thead>
        <tbody>
            <Component jobs = {jobs} handleClose = {handleClose}/>
  
        </tbody>
         </table>
        </>
    )
}



function Component({jobs , handleClose}){


        const handleApplied = async (job)=>{


                        const data =  await httpGetAppliedPeople(job.id)
                        console.log(data)
                        if(data){
                          return <Appliedjobs people = {data} jobId = {job.id} />
                        }
        }




        return(
            <>
                {jobs.map(job => 
       
       
       <tr key={job._id}>
        
       <td>
        {job.title}
       </td>
        <td className="d-none d-md-inherit">
            {job.department}
        </td>
        <td>
            {new Date(job.deadline).toLocaleDateString()}
        </td>
        <td  className="text-center">
        <Link to = {`appliedpeople/${job.id}`} >  {job.personsApplied.length} </Link>
          
           
        </td>
        
        <td>{job.status}</td>
        <td ><button onClick = {()=>{handleClose(job.id , job)}} className="btn btn-primary"><i className="bi bi-x-square"></i></button></td>
        <td><i className="bi bi-three-dots"></i></td>
        

         </tr>
        
        
        )
        
        }
            
            </>
        )
}
