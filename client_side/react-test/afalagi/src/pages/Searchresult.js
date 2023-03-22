import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Components } from "./Newsfeed";


export default function Searchresult(){
//     const location = useLocation()
    // const [jobList , setJobList] = useState([])

    const jobList = JSON.parse(localStorage.getItem("joblist"))
    console.log(jobList)
    console.log("job list ........")
    
    return(
        <div className="container">
            <h1> {jobList&& jobList.length} Matches found. </h1>
            <ListOfJobs jobs = {jobList} /> 
        
        </div>
    )
}

              
function ListOfJobs({jobs}){
    return(
        <div className="row">
            {jobs?.map(job=>
                <div className="job-list bg-lightgrey border shadow mb-2 p-3 col-md-10 col-lg-9 ms-auto me-auto">
                  
                        <h3 className="lead"> {job.title} </h3>
                        <p className="fw-bold "> {job.companyName}</p>
                        <p className="fw-italics fs-1"> {job.status} </p>
                        <p className="fs-2 fw-italics">{job.description}</p>
                  
                   </div> 
                )}
        </div>
    )
}

