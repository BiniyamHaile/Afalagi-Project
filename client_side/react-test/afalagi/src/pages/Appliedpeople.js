import { useContext, useEffect, useState } from "react";
import { httpGetAppliedPeople } from "../requests/Requests.js";
import male from "../images/male.jpg";
import {useParams} from "react-router-dom"
import { ObjectContext } from "../components/Contexts.js";
import { httpCreateNotification } from "../requests/Requests.js";
import "../styles/applied.css";

export default function Appliedpeople(){
   const {jobId} = useParams()
    const[people , setPeople] = useState()
    useEffect( ()=>{
         async function fetcher(){

            
           const data = await httpGetAppliedPeople(jobId)
           console.log(data)
            setPeople(data)
            
        }

        fetcher()
    } , [])


    
   
    return(
        <div>
        
         {people && people.length > 0 && <h1 className="text-success text-center"> {people.length} {people.length == 1 ? "Person" : "People"  } Applied To This Job!</h1>}

            <ObjectContext.Provider value = {[jobId ,  people ]}>
                     {people  && people.length > 0 && <Component  /> }
            </ObjectContext.Provider>

         {people && people.length === 0 && <Message />}

            
        </div>
    )
}


function Component(){
    const [jobId , people] = useContext(ObjectContext)
    console.log("right after this")
    console.log(people)
    console.log(people.isArray)

    return(
            <div key = {jobId} className="container-fluid mt-5">

            <div className = " row">

            { people  && people.map(person =>
                
                
                    <div key = {person.id} className = "col-md-4 col-lg-3 m-auto">


                                <div className="card" styles={"width: 18rem;"}>
                                <img src={male} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title"> {person.firstName} {person.lastName} </h5>
                                    <p > <span className="fw-bold">  Experience : </span> {person.experience} years. </p>
                                   <div className="description">  <p className="card-text"> {person.description} </p> </div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"> <span className="fw-bold">  Location : </span> {person.location} </li>
                                    <li className="list-group-item"> <span className = "fw-bold"> Email :  </span> {person.email} </li>
                                    <li className="list-group-item">  <span className = "fw-bold"> Phone :  </span>   {person.phone} </li>
                                    
                                </ul>
                                <div className="card-body">
                                 <div className="d-flex justify-content-around"> 
                                    <Button value = {"Confirm"} personId = {person.id} />
                                    <Button value = {"Decline"}  personId = {person.id} />    
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


function Confirm({ personId}){
    const[clicked , setClicked] = useState("Accept")
    const handleConfirm = async()=>{
        const result =  await httpCreateNotification(personId , "accept" )
       
        result.ok ? setClicked("Accepted") : setClicked("Accepted");
    }
    return (
        <>
        <button className="btn btn-success" onClick={ clicked ==="Accept" ?  handleConfirm : ""}><i className="bi bi-check-lg text-info fw-bold " ></i>{clicked}</button>
        </>
    )
}


function Decline({ personId}){
    const[decline , setDecline] = useState("Decline")
    const handleDecline = async()=>{
        const result =  await httpCreateNotification(personId , "decline" )
        result.ok ? setDecline("Declined!") : setDecline("Decline")
    }
    return (
        <>
        <button className="btn btn-primary" onClick={handleDecline}><i className="bi bi-check-lg text-danger " ></i> {decline}</button>
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