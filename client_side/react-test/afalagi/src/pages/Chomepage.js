import { useState , useEffect } from "react";
import { httpCreateNotification, httpGetRandomFreelancers, httpGetRequest } from "../requests/Requests.js"
import male from "../images/male.jpg";

export default function Chomepage(){
    const [freelancers , setFreelancers] = useState([])

    useEffect(
        ()=>{
            async function fetcher(){
                const result =  await httpGetRandomFreelancers()
                setFreelancers(result)
               
            }
    
            fetcher() 
        }, [])
    return(
        <div className="display-flex justify-content-center ">
        <div className="border-danger">
            <h1> Welcome {localStorage.getItem("name")} </h1>
        {freelancers && <Component freelancers={freelancers}/>}
        </div>
        </div>
    )
}





function Component({freelancers}){

    return(
            <div className="container-fluid container-md mt-5">

            <div className = "row">

            {freelancers.map(freelancer =>
                
                
                    <div key = {freelancer.id} className = "col-md-5  mt-md-2 me-md-2">


                                <div className="card" styles={"width: 18rem;"}>
                                <img src={male} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title"> {freelancer.firstName} {freelancer.lastName} </h5>
                                    <p > <span className="fw-bold">  Experience : </span> {freelancer.experience} years. </p>
                                    <p className="card-text"> {freelancer.description} </p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"> <span className="fw-bold">  Location : </span> {freelancer.location} </li>
                                    <li className="list-group-item"> <span className = "fw-bold"> Email :  </span> {freelancer.email} </li>
                                    <li className="list-group-item">  <span className = "fw-bold"> Phone :  </span>   {freelancer.phone} </li>
                                    
                                </ul>
                                <div className="card-body">
                                 <div className="d-flex justify-content-around"> 
                                    <Connect   personId = {freelancer.id} />
                                     
                                 </div>
                                </div>
                                </div>




                    </div>

                
                )}
                </div>

            </div>
    )
}





export function Connect({personId}){
    const[connect  , setConnect] = useState()
    useEffect(()=>{
        const fetcher = async()=>{
            const response = await httpGetRequest(`/freelancer/checkconnection/${personId}`)
            console.log(response)
            response.ok ? setConnect("Connection request sent!") : setConnect("Connect")
        }

        fetcher()
    } , [])

    
    const handleClick = async ()=>{
        const result = await httpCreateNotification(personId , "connect");
        result.ok  ? setConnect("Connection request sent!")  : setConnect("Connect")
    }
    return(
        <>
            <button className="btn btn-lg btn-success" onClick = {handleClick} > {connect} </button>
        
        </>
    )
}