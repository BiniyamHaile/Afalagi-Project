import { useEffect, useState } from "react";
import { httpGetAppliedPeople } from "../requests/Requests.js";
import male from "../images/male.jpg";
import female from "../images/female.png" ;
import {useParams} from "react-router-dom"

// ... Don't forget to use "useContext  , createContext" here

export default function Appliedpeople(){
   const {jobId} = useParams()
    const[people , setPeople] = useState()
    useEffect( ()=>{
         async function fetcher(){

            console.log("async function......")
           const data = await httpGetAppliedPeople(jobId)
          
            setPeople(data)
            console.log(`data is ${data}`)
        }

        fetcher()
    } , [])


    console.log(people)
   
    return(
        <div>
            {people && people.length > 0 && <h1 className="text-success text-center"> {people.length} {people.length == 1 ? "Person" : "People"  } Applied To This Job!</h1>}
         {people && people.length > 0 && <Component jobId={jobId} people = {people} /> }

         {people && people.length === 0 && <Message />}

            
        </div>
    )
}


function Component({people , jobId}){

    return(
            <div key = {jobId} className="container-fluid mt-5">

            <div className = "row">

            {people.map(person =>
                
                
                    <div key = {person.id} className = "col-md-4 col-lg-3">


                                <div className="card" styles={"width: 18rem;"}>
                                <img src={male} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title"> {person.firstName} {person.lastName} </h5>
                                    <p > <span className="fw-bold">  Experience : </span> {person.experience} years. </p>
                                    <p className="card-text"> {person.description} </p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"> <span className="fw-bold">  Location : </span> {person.location} </li>
                                    <li className="list-group-item"> <span className = "fw-bold"> Email :  </span> {person.email} </li>
                                    <li className="list-group-item">  <span className = "fw-bold"> Phone :  </span>   {person.phone} </li>
                                    
                                </ul>
                                <div className="card-body">
                                 <div className="d-flex justify-content-around"> 
                                    <Button value = {"Confirm"} jobId = {jobId} personId = {person.id} />
                                    <Button value = {"Decline"} jobId = {jobId} personId = {person.id} />    
                                 </div>
                                </div>
                                </div>




                    </div>

                
                )}
                </div>

            </div>
    )
}



function Button({value , jobId , personId}){
    return(
        value === "Confirm" ? <Confirm jobId = {jobId} personId = {personId} /> : <Decline jobId = {jobId}  personId = {personId} />
    )
}


function Confirm({jobId , personId}){
    return (
        <>
        <button className="btn btn-success"><i className="bi bi-check-lg text-info fw-bold " ></i> Accept</button>
        </>
    )
}


function Decline({jobId , personId}){
    return (
        <>
        <button className="btn btn-primary"><i className="bi bi-check-lg text-danger " ></i> Decline</button>
        </>
    )
}



function Message(){
    return(
        <>
        <h1 className="text-success text-center">Sorry, No one applied for this job yet.</h1>        

      
        
        </>
    )
}