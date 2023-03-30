const { response } = require("express");
const { acceptFreelancer } = require("../job/job.model");
const {
    getAppliedFreelancer,
    getNotificationCount ,
    getAllNotifications ,
    getRandomFreelancers , 
     createFreelancer , 
     createNotification ,
     loginFreelancer , 
     getAppliedPeople , 
        checkApplied, 
        searchFreelancer,
        checkConnection, 
        pushConnection,
        getAppliedJobs,
        getProfile,
        checkEmail,
        updateProfile
    } = require("./freelancer.model");

async function httpCreateFreelancer(req , res){
    const body  = req.body
   
    const returned  = await  createFreelancer(body);

    if(returned === true){
        res.status(201).json({
            ok : returned
        })
    } else{
        res.status(400).json({
            message : returned
        })
    }

}




function httpDeleteFreelancer(req  ,res){
    // const id = +req.params.id
    // deleteFreelancerById(id)
    // // check if the freelancer exist in the database
    // res.status(201).json({
    //     ok : true
    // })
}

function httpGetAllFreelancers(){

}

async function httpLoginFreelancer( req , res){

        return await loginFreelancer(req, res)
   
     }
     
     
async function httpGetAppliedPeople(req, res){
    const id = req.params.id
    const result = await getAppliedPeople(id)
    
    if(result){ 
        return res.status(200).json(result)
    }
    else{
        return res.status(400).json({ok : false})
    }
}     
     





async function httpGetRandomFreelancers(req, res){
  
    result = await getRandomFreelancers()
    if(result){
      return  res.status(200).json(result)
    }
    else{
       return res.status(400).json({ok : false})
    }
}


async function httpCreateNotification(req , res){
   
    const notification = req.body;

    const id = req.params.id
    notification.unread = true
    const email = res.locals.companyEmail
    console.log(notification)
    if(notification['kind'] === 'connect'){
        check = await checkConnection(id , email);
        
         
        if(check){
            
            return  res.status(400).json({ok : false})
        }else{
            
            const result = await pushConnection(id , email)
            
            if(result){
                return res.status(200).json({ok:true})
            }else{
                return res.status(400).json({ok : false})
            }
        }

    }

    
    
    const result =  await createNotification(id , notification)

   if(result){
    res.status(200).json({ok : true})
   }else{
    res.status(400).json({ok : false})
   }
}

async function httpGetNotificationCount(req , res){
    const email = res.locals.email
    result = await getNotificationCount(email)
    
    if(result !== false){
        res.status(200).json(result)
    }else{
        res.status(400).json({ok : false})
    }
}

async function httpGetAllNotifications(req , res){
    const email = res.locals.email
    const result=  await getAllNotifications(email)
    if(result){
       
        res.status(200).json(result)
    }else{
        res.status(400).json({ok:false})
    }
}


async function httpSearchFreelancer(req, res){
    const name = req.params.name
    const result = await searchFreelancer(name)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json(result)
    }
}

async function httpCheckApplied(req , res){
    const email  = res.locals.id
    const jobId = req.params.id
    const result = await checkApplied(email , jobId)
    if(result){
        res.status(200).json({ok : true})
    }else{
        res.status(200).json({ok : false})
    }

}


async function httpCheckConnection(req , res){
   
    const id = req.params.id
    const email =res.locals.companyEmail
    
    const result = await checkConnection(id , email)
    if(result === true){
        res.status(200).json({ok : true})
    }else{
        res.status(200).json({ok : false})
    }
}


async function httpGetAppliedJobs(req , res){
    email = res.locals.email
   
    result = await getAppliedJobs(email)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json({ok : false})
    }
    
}

async function httpGetAppliedFreelancer(req , res){
    const freelancerId = req.params.id

    const result = await getAppliedFreelancer(freelancerId) ; 
   
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json({ok : false})
    }
}

async function httpGetProfile(req , res){
    const freelancerId = res.locals.id
<<<<<<< HEAD
    console.log(`freelancer Id is ${freelancerId}`)
    const result  = await getProfile(freelancerId)

    if(result !==false){
=======

    const result  = await getProfile(freelancerId)

    if(result !== false){
>>>>>>> profile
      return  res.status(200).json(result)
    }else{
        return res.status(400).json({ok  : false})
    }
}



async function httpUpdateProfile(req, res){
    let changed;
    let exist;
    body = req.body
    bodyEmail = body.email
    email = res.locals.email
    id = res.locals.id
    
    changed =  email === bodyEmail ? false : true 
    


    const result = await checkEmail(bodyEmail)
    if(changed === false){
        exist = false
    }else if(changed === true & result === 1){
        exist = true
    }else if(changed === true & result ===0){
        exist = false
    }
    const response = await updateProfile(id , body)


    if(!exist & response ){
        res.status(200).json({ok : true})
    }else{
        res.status(400).json({ok : false})
    }



}
module.exports = {
    httpUpdateProfile, 
    httpGetProfile , 
    httpGetAppliedFreelancer , 
    httpGetAppliedJobs , 
    httpCheckConnection ,
    httpCheckApplied , 
    httpSearchFreelancer , 
    httpGetAllNotifications,
    httpGetRandomFreelancers , 
    httpCreateFreelancer , 
    httpDeleteFreelancer , 
    httpGetAllFreelancers , 
    httpLoginFreelancer , 
    httpGetAppliedPeople, 
    httpCreateNotification, 
    httpGetNotificationCount , 
    

}