import { useContext, useEffect, useState } from "react";
import { httpAcceptFreelancer, httpGetAppliedPeople, httpGetAppliedPerson } from "../requests/Requests.js";
import male from "../images/male.jpg";
import {useParams} from "react-router-dom"
import { ObjectContext } from "../components/Contexts.js";
import "../styles/applied.css";

export default function Appliedpeople(){
   const {jobId} = useParams()
    const[people , setPeople] = useState()
    useEffect( ()=>{
         async function fetcher(){

            
           const data = await httpGetAppliedPeople(jobId)
         
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
   

    

    return(
            <div key = {jobId} className="container-fluid mt-5">

            <div className = " row">

            { people  && people.map(data =>
                <div key = {data.id}>
                    <AppliedPerson data = {data} jobId = {jobId} />
                    </div>
                
                )}



                </div>

            </div>
    )
}



function AppliedPerson({data , jobId}){
    const[person , setPerson] = useState([])
    const personId = data.id
    const response = data.response
    useEffect(
        ()=>{
            const fetcher = async()=>{
                const response = await httpGetAppliedPerson(personId)
                setPerson(response)
            }

            fetcher()
        } , []
    )

       
        return(
        <div key = {person.id} className = "col-md-4  m-auto mt-3">


        <div className="card" styles={"width: 18rem;"}>
        <img src={male} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title"> {person.firstName} {person.lastName} </h5>
            <p > <span className="fw-bold">  Experience : </span> {person.experience} years. </p>
           <div className="desc">  <p className="card-text"> {person.description} </p> </div>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"> <span className="fw-bold">  Location : </span> {person.location} </li>
            <li className="list-group-item"> <span className = "fw-bold"> Email :  </span> {person.email} </li>
            <li className="list-group-item">  <span className = "fw-bold"> Phone :  </span>   {person.phone} </li>
            
        </ul>
        <div className="card-body">
         <div className="d-flex justify-content-around"> 
            <Button response = {response} personId = {person.id} jobId = {jobId} />
             
         </div>
        </div>
        </div>
</div>
    )
}


function Button({response , jobId , personId}){
    return(
        response === "Pending" ? <Confirm jobId = {jobId} personId = {personId} /> : <Accepted />
    )
}


function Confirm({ personId , jobId}){
    const[clicked , setClicked] = useState("Accept")


    const handleConfirm = async()=>{
        const result =  await httpAcceptFreelancer(jobId , personId  )

       
        result.ok ? setClicked("Accepted") : setClicked("Acceptt");
    }
    return (
        <>
        <button className="btn btn-success" onClick={ clicked ==="Accept" ?  handleConfirm : ""}><i className="bi bi-check-lg text-info fw-bold " ></i>{clicked}</button>
        </>
    )
}


function Accepted(){
   
 
    return (
        <>
        <button className="btn btn-primary" ><i className="bi bi-check-lg text-danger " ></i>Accepted</button>
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