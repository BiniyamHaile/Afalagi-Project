import { URL } from "./Requests";
async function getUser(){
   

    return fetch(`${URL}/user` , {
        headers : {
            'x-access-token'  : localStorage.getItem('token')
        }
    }).then(response => response.json()).then(data => data)

    


    
}

export {getUser}