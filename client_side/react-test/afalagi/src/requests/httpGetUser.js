
export default function httpGetUser(url){
    return async()=>{
        return await fetch('http://localhost:3000/user' , {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        }).then(response=> response.json()).then(data => {return data})
    }
}