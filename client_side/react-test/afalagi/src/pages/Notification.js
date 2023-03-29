import { useEffect , useState} from "react"
import { httpGetRequest } from "../requests/Requests"
import  "../styles/notifications.css"
export default function Notification(){
    const [notifications , setNotifications] = useState([])
    useEffect(
        ()=>{
            async function fetcher(){
                const response = await httpGetRequest("/freelancer/notifications")
               
                setNotifications(response)
            }
            fetcher()
        }
        ,[]
    )

    
    return(
        <div className = "container">
            <Component notifications = {notifications}/>
        </div>
    )
}



function Component({notifications}){
   
    return(
        <div>
            {notifications.map(notification => {
                   
                    return(
                       
                        <div className= {notification.unread === true ? "mt-2 unread shadow" : "mt-2 read shadow"} key = {notification.message}>
                   
                        <p  >   <span className="fw-bold"> {notification.companyName} </span> {notification.message}
                        
                        </p>
                        
                        </div>
                    )
                }
            


                
                )}
        </div>
    )
}