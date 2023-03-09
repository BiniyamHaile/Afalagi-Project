import "../styles/home.css"
import Homeheader from "../components/Homeheader";
import { Route, Routes } from "react-router-dom";
import Notification from "./Notification" ; 
import Newsfeed from "./Newsfeed";
import { useEffect, useState } from "react";
import httpGetUser from "../requests/httpGetUser";
import Appliedjobs from "./Appliedjobs";

export default function Home(){
    const[user , setUser] = useState({})
    // useEffect(()=>{
    //     setUser(httpGetUser())
    // } , [])    

    
    useEffect(
        ()=>{
            fetch('http://localhost:3000/user' , {
                headers : {
                    'x-access-token' : localStorage.getItem("token")
                }
            }).then(response => response.json()).then(data => {
                setUser(data)
                console.log(data)
                console.log(`data is ${data}`)
            })
        } , []
  )

    return(
        <>
            <Homeheader user ={user}/>
            <Routes>
                <Route path = "/" element = {<Newsfeed/>} exact />
                <Route path = "/appliedjobs/:userId" element = {<Appliedjobs/>} exact />
                <Route path = "/notification" element = {<Notification/>} exact />
                
            </Routes>
        </>    )}