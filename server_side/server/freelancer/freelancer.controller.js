const {getNotificationCount ,
    getAllNotifications ,
    getRandomFreelancers , 
     createFreelancer , 
     getFreelancerById  , 
     createNotification ,  
     deleteFreelancerById, 
     loginFreelancer , 
     getAppliedPeople , 
        checkApplied, 
        searchFreelancer,
        checkConnection, 
        pushConnection
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


function  httpGetFreelancerById(req  ,res){
//    const id = +req.params.id
//     const freelancer = getFreelancerById(id)
//     console.log(freelancer)
//     res.status(200).json(freelancer)

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
    console.log("request")
    const notification = req.body;
    const id = req.params.id
    notification.unread = true
    const email = res.locals.companyEmail
    console.log("email is " , email)
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
    if(result){
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
    const email  = res.locals.email
    const jobId = req.params.id
    const result = await checkApplied(email , jobId)
    if(result){
        res.status(200).json({ok : true})
    }else{
        res.status(404).json({ok : false})
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



module.exports = {
    httpCheckConnection ,
    httpCheckApplied , 
    httpSearchFreelancer , 
    httpGetAllNotifications,
    httpGetRandomFreelancers , 
    httpCreateFreelancer , 
    httpDeleteFreelancer , 
    httpGetAllFreelancers , 
    httpGetFreelancerById , 
    httpLoginFreelancer , 
    httpGetAppliedPeople, 
    httpCreateNotification, 
    httpGetNotificationCount , 
    

}