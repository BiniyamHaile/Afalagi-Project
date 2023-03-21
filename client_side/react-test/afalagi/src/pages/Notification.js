import { useEffect , useState} from "react"
import { httpGetRequest } from "../requests/Requests"

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
                       
                        <div className= {notification.unread === true ? "mt-2 bg-light border" : "mt-2 bg-light border"} >
                   
                        <p  >   <span className="fw-bold"> {notification.companyName} </span> {notification.message}
                        
                        </p>
                        
                        </div>
                    )
                }
            


                
                )}
        </div>
    )
}