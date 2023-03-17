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
            {notifications.map(notification => 
                <div className= {notification.unread === true ? "mt-2 bg-secondary border" : "mt-2 bg-light border"} >
                    <p > <span className="fw-bold"> {notification.companyName} </span> {notification.message}
                    please check their email <span className="fs-italics fw-bold">{notification.email}</span>
                    </p>
                    
                    </div>
                
                )}
        </div>
    )
}