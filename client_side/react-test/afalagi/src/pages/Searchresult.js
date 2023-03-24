import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Apply, Components } from "./Newsfeed";


export default function Searchresult(){

    const jobList = JSON.parse(localStorage.getItem("joblist"))
    console.log(jobList)
    console.log("job list ........")
    
    return(
        <div className="container text-center">
            <h1> {jobList.length > 0 ? `${jobList.length} Matches found.` : "No matches found for your search. Please try using different keyword." }  </h1>
            <ListOfJobs jobs = {jobList} /> 
        
        </div>
    )
}

              
function ListOfJobs({jobs}){
    return(
        <div className="row">
            {jobs?.map(job=>
                <div className="job-list position-relative bg-lightgrey border shadow mb-2 p-5 col-md-10 col-lg-9 ms-auto me-auto">
                  
                        <p className="lead fw-bold  fs-1"> {job.title} </p>
                        
                        <p className="fs-3 "> {job.companyName}</p>
                        <p className="fw-italics fs-3"> {job.status} </p>
                        <p className="fs-2 fw-italics">{job.description}</p>
                        <div className="w-100 d-flex justify-content-center" > <span ><Apply job = {job} /> </span> </div>
                        
                   </div> 
                )}
        </div>
    )
}

