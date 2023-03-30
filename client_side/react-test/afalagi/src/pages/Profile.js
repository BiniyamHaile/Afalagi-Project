import { useState , useEffect } from "react"
import { httpGetProfile } from "../requests/Requests"
import "../styles/signup.css";
export function Profile(){
    const[user , setUser] = useState()
    useEffect(()=>{
        const fetcher = async ()=>{
            const response = await httpGetProfile()
            console.log(response)
            setUser(response)

        }
        fetcher()
    })


    return(
        <>
        {user &&  <Component user = {user} /> }
        </>
    )
}


function Component({user}){
    const[firstName , setFname] = useState(user.firstName)
    const[lastName , setLname]= useState(user.lastName)
    const[email , setEmail] = useState(user.email)
    const[description , setDescription] = useState(user.description)
    const[department , setDepartment] = useState(user.department)
    const[phone , setPhone] = useState(user.phone)

    return(
        <div className="post bg-light shadow-lg">

        <div> 
        <h2> Edit Profile </h2> <div><i class="bi bi-pen"></i> </div>

        </div>

        <div className = "inputs-container  "> 
            <div className="input-container ">
                <label className="position-relative">First name</label>
                <input type= "text" value = {firstName} onChange = {(e)=>setFname(e.target.value)} />
            </div>
            <div className="input-container ">
                <label className="position-relative">Last name </label>
                <input type= "text" value = {lastName} onChange = {(e)=>setFname(e.target.value)} />
            </div>

            <div className="input-container ">
                <label className="position-relative">Email </label>
                <input type= "text" value = {email} onChange = {(e)=>setFname(e.target.value)} />
            </div>

            <div className="input-container ">
                <label className="position-relative">Phone </label>
                <input type= "text" value = {phone} onChange = {(e)=>setFname(e.target.value)} />
            </div>



            <div className="input-container ">
                <label className="position-relative">Description </label>
                <input type= "text" value = {description} onChange = {(e)=>setFname(e.target.value)} />
            </div>


            <div className="input-container ">
                <label className="position-relative">Department </label>
                <select name = "department" defaultValue={department} onChange={(e)=>setDepartment(e.target.value)}>
                        <option value = "IT"  >IT</option>
                        <option value = "Law">Law</option>
                        <option value = "Psychology">Psychology</option>
                        <option value = "Health">Health</option>
                        <option value = "Graphics">Graphics Designer</option>
                    </select>
            </div>







        </div>
    
    
    
    </div>
    )
}