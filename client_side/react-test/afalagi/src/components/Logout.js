import { URL } from "../requests/Requests";
async function handleLogout(){
    const res = await fetch(`${URL}/logout`).then(response=>response.json()).then((data)=>  data);
    console.log(res)
    if(res.ok ){
        localStorage.clear();
        window.location.href = "/login"
    }

}     


 export function Logoutbtn({className = ""}){

    
    return(
        
        <button className = {className} onClick = {handleLogout}> Log out </button>
       
    )
}


export function Logout({className = ""}){
    return(
        <p className = {`${className} cursor-pointer`} onClick = {handleLogout}> Log out </p>
    )
}

