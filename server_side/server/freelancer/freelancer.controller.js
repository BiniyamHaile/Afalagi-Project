const {getNotificationCount ,
    getAllNotifications ,
    getRandomFreelancers , 
     createFreelancer , 
     getFreelancerById  , 
     createNotification ,  
     deleteFreelancerById, 
     loginFreelancer , 
     getAppliedPeople} = require("./freelancer.model");

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
    console.log("... Incoming request ... ")
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
    id = req.params.id
    notification.unread = true
    console.log(notification)
    
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
module.exports = {
    httpGetAllNotifications,
    httpGetRandomFreelancers , 
    httpCreateFreelancer , 
    httpDeleteFreelancer , 
    httpGetAllFreelancers , 
    httpGetFreelancerById , 
    httpLoginFreelancer , 
    httpGetAppliedPeople, 
    httpCreateNotification, 
    httpGetNotificationCount

}