

//export const URL = 'http://localhost:3000'

export const URL = 'https://mern-bllq.onrender.com'



export async function Login(path , body){
    return  await fetch(`${URL}${path}` , {
        method : "POST" , 
        headers : {
          "Content-Type" : "application/json"
        } , 
        body : body
      }).then(response =>response.json()).then(data => data)
}

export async function httpApplyToJob(job_id){
        
     return   fetch(`${URL}/job/applytojob` , {
                    method : "POST" , 
                    headers : {
                        "Content-Type" : "application/json" , 
                        "x-access-token" : localStorage.getItem("token")} ,
                    body : JSON.stringify({
                        id : job_id , 
                        email : localStorage.getItem("email")

                    })
                    
            }).then(response => response.json())
                .then(data => {
                       
                        return data})

}



export async function httpGetAppliedPeople(jobId){
    const response =  await fetch(`${URL}/freelancer/appliedpeople/${jobId}` , {
        headers : {
            'x-access-token' : localStorage.getItem("token")
        }
    })

    const result =  await response.json()

    

    return result
}



export async function httpGetAppliedJobs(){
    const response = await fetch(`${URL}/job/appliedjobs` , {
        headers : {
            'x-access-token' : localStorage.getItem("token")
        }
    })

    const data = await response.json()
 
    return data
}



export async function httpGetRandomFreelancers(){
    const response = await fetch(`${URL}/freelancer/random` , {
        headers : {
            'x-access-token' : localStorage.getItem("token")
        }
    })

   
    const data = await response.json()
    console.log(data)
    return data
}






export async function httpCloseJob(id){
          return fetch(`http://localhost:3000/job/closejob/${id}` , {
                                method : "PATCH" , 
                                headers : {
                                    'x-access-token' : localStorage.getItem("token")
                                }
                                 }).then(response => response.json()).then(data =>data)
}



export async function httpGetRequest(path){
    return fetch(`${URL}${path}` , {
        headers : {
            "x-access-token"  :  localStorage.getItem("token")
        }
    }).then(response => response.json()).then(data =>data)
}


export async function httpPostRequest(path , body){
    return fetch(`${URL}${path}` , {
        method : "POST" , 
        headers : {
            'x-access-token' : localStorage.getItem("token")
        } , 
        body : JSON.stringify(body)
    }).then(response => response.json()).then(data=> data)
}