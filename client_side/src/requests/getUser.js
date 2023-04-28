import { URL, httpGetRequest } from "./Requests";
async function getUser(){
   

    return httpGetRequest(`/user`)

    
}

async function getCompany(){
    return fetch(`${URL}/cloggedin` , {
        headers : {
            'x-access-token'  : localStorage.getItem('token')
        }
    }).then(response => response.json()).then(data => data)
}

export {getUser , getCompany}