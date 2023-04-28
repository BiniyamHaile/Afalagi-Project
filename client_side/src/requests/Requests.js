

export const URL = 'http://localhost:5001'
//export const URL = 'https://mern-bllq.onrender.com'



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
                        personId : localStorage.getItem("id")
    })
                    
            }).then(response => response.json())
                .then(data => {
                       
                        return data})

}



export async function httpGetAppliedPeople(jobId){
    const response =  await fetch(`${URL}/job/appliedpeople/${jobId}` , {
        headers : {
            'x-access-token' : localStorage.getItem("token")
        }
    })

    const result =  await response.json()

    

    return result
}



export async function httpGetAppliedJobs(){
    const response = await fetch(`${URL}/freelancer/appliedjobs` , {
        headers : {
            'x-access-token' : localStorage.getItem("token")
        }
    })

    const data =  await response.json()
 
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
          return fetch(`${URL}/job/closejob/${id}` , {
                                method : "PATCH" , 
                                headers : {
                                    'x-access-token' : localStorage.getItem("token") ,
                                    'Content-type' : "application/json"
                                
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
            'x-access-token' : localStorage.getItem("token") , 
            'Content-Type' : 'application/json'
        } , 
        body : JSON.stringify(body)
    }).then(response => response.json()).then(data=> data)
}





export async function httpCreateNotification(id, kind){
    const name  = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const msg = message(kind , name , email)
    return fetch(`${URL}/freelancer/createnotification/${id}` , {
        method : "POST" , 
        headers : {
            'x-access-token' : localStorage.getItem("token"), 
            'Content-Type' : "application/json"
        } , 
        body : JSON.stringify( {
            companyName : name, 
            message : msg , 
            email :email , 
            kind : kind
    
        })
    }).then(response => response.json()).then(data=> data)
}



function message(kind , name , email){
    let msg;
    if(kind === "connect"){
         msg = `${name} company wants to contact you. Please check their email , ${email}`
    }
    else if(kind ==="accept"){
         msg = `${name} company accepted your job application. Please check their email , ${email}`
    }
    else if(kind === "decline"){
         msg = `Sorry, ${name} company didn't accept your job application.`
    }
    else{
         msg = " "
    }
    return msg
}


export async  function httpAcceptFreelancer(jobId , freelancerId){
    console.log(`jobId is  : ${jobId}`)
    const name = localStorage.getItem("name")
    const email  = localStorage.getItem("email")
    // const message = message("accept" , name , email)

    const message = `${name} company accepted your job application. Please check their email , ${email}`
    const body = {
        
        jobId : jobId  ,
        freelancerId :  freelancerId ,
        contain  : {
            message : message , 
            kind : "accept"
        }

    }
    return await httpPostRequest('/job/acceptfreelancer' , body )
}









export async function httpGetNotificationCount(){
    const response =  await fetch(`${URL}/freelancer/notify`,  {
        headers : {
            'x-access-token'  : localStorage.getItem("token") 
        }
    })
    const data = await response.json()
    return data
}

export async function httpGetPostedJob(jobId){
    return await httpGetRequest(`/job/postedjob/${jobId}`)
}


export async function httpGetAppliedJob(jobId){
   return await httpGetRequest(`/job/appliedjob/${jobId}`)
}

export async function httpGetAppliedPerson(freelancerId){
    return await httpGetRequest(`/freelancer/appliedfreelancer/${freelancerId}`)

}


export async function httpGetPostedJobs(){
    return await httpGetRequest("/company/jobsposted");
}


export async function httpSearchJob(body){
    return await httpPostRequest('/job/searchjob' , body)
}


export async function httpGetProfile(){
    return await httpGetRequest('/freelancer/profile')
}


export async function httpUpdateProfile(body){
    return await httpPostRequest('/freelancer/updateprofile' , body)
}