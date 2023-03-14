import "../styles/home.css"
import Homeheader from "../components/Homeheader";
import { Route, Routes } from "react-router-dom";
import Notification from "./Notification" ; 
import Newsfeed from "./Newsfeed";
import { useEffect, useState } from "react";
import httpGetUser from "../requests/httpGetUser";
import Appliedjobs from "./Appliedjobs";
import { httpGetNotificationCount, URL } from "../requests/Requests";
export default function Home(){
    const[user , setUser] = useState({})
    const[count  , setCount] = useState(0)
    // useEffect(()=>{
    //     setUser(httpGetUser())
    // } , [])    


    
    useEffect(
        ()=>{
            fetch(`${URL}/user` , {
                headers : {
                    'x-access-token' : localStorage.getItem("token")
                }
            }).then(response => response.json()).then(data => {
                setUser(data)

            })

            async function fetcher(){
                const number = await httpGetNotificationCount()
                setCount(number)
                localStorage.setItem("notification-count" , number)
                console.log(`notifications :  ${number}`)
                console.log(number)
                
            }
            fetcher()
        } , [])
       
    return(
        <>
           {count &&  <Homeheader user ={user} count = {count }/>}
            <Routes>
                <Route path = "/" element = {<Newsfeed/>} exact />
                <Route path = "/appliedjobs/:userId" element = {<Appliedjobs/>} exact />
                <Route path = "/notification" element = {<Notification  />}  exact />
                
            </Routes>
        </>    )}