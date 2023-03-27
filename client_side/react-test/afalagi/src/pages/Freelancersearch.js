import { useParams } from "react-router-dom"
import { httpGetRequest } from "../requests/Requests";
import { useEffect, useState } from "react";
import "../styles/components/searchStyle.css"
import { Connect } from "./Chomepage";
export default function FreelancerSearch(){
    const {query} = useParams()
    const[freelancers , setFreelancers] = useState()
    useEffect(
        ()=>{
            const fetcher =  async()=>{
                const response=  await httpGetRequest(`/freelancer/search/${query}`)
                setFreelancers(response)
            }
            fetcher()
        }
    );
    return(
        <>
        {
            freelancers && <SearchComponent freelancers = {freelancers} />
        }
        </>
    )
}

function SearchComponent({freelancers}){
    return(
        <>
        <h1> {freelancers.length > 0 ? `${freelancers.length} matches found!` : "Sorry, No matches found for your search. Try using different keyword."} </h1>
        <RenderComponents freelancers = {freelancers} />
        </>
    )
}

function RenderComponents({freelancers}){
    return(
        <div >
            {freelancers.map(freelancer => 
                
                <div className = "m-2 border p-3" key = {freelancer.id} >
                        
                        <div className= "photo-container ms-md-5"> 
                           <div className = "photo">  <h1 >{freelancer.firstName.slice(0,1)} </h1> </div>  <h2 className = "name" > {`${freelancer.firstName} ${freelancer.lastName}`} </h2>
                        </div>
                        <div className="ms-md-5">
                           
                            <p className="fw-italics"> Experience :  {freelancer.experience} years </p>
                            <p> {freelancer.description} </p>
                            <p className="fw-italics"> Phone :  {freelancer.phone} </p>
                            <p> Email : {freelancer.email} </p>
                            <Connect personId={freelancer.id} />
                        </div>
                </div>
                
                )}

        </div>
    )
}