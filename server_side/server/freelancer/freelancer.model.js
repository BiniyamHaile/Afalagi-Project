const freelancer = require("./freelancer.mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")
require("dotenv").config()

const config = {
    COOKIE_KEY : process.env.COOKIE_KEY
}






async function createFreelancer(body){
   
  const existObj =   await freelancer.find({email : body.email})


    hashedPassword = await bcrypt.hash(body["password"] , 10)

    body["password"] =hashedPassword;
    
    body["id"] = uuid.v4()

    try {
        if (!existObj.length){
            await freelancer.findOneAndUpdate({email : body.email} , body , {upsert : true})
            return true
        
          } else if(existObj.length){
            return "this email already exist!"
          }
          else{
            return "Invalid credentials!"
          }
    } catch (error) {
        console.log(error)
        return false
    }

   
    
}












async function loginFreelancer(req , res){

        
  const user = await  freelancer.findOne({
    email : req.body.email 
}).select("+password")



if(!user){
    return res.status(401).json({user : false , message : "email doesn't exist"}) //no user , so check the email!
}   
else if(await bcrypt.compare(req.body.password , user.password )){
    const token = jwt.sign(
        {email : user.email , name : user.firstName  , department : user.department , id : user.id} , config.COOKIE_KEY
    )
    return res.status(201).json({   user : token})
}
else{
    return res.status(403).json({user : false , message : "passwords didn't match"})
}


}
           
 
async function addAppliedJob(freelancerId , jobId){
        try {
           await freelancer.updateOne(
            {id  : freelancerId}  , {$push : {appliedJobs : jobId}})

            const me = await freelancer.find({id : freelancerId})

           return me
        } catch (error) {
           
            return false
        }
}






async function getAppliedPeople(job_id){
    try{
        const result =  await freelancer.find({appliedJobs : job_id} , {job_id : 0  , password : 0 })
        return result
    }
    catch(error){
      
        return false
    }
}



async function getRandomFreelancers(){
   return freelancer.aggregate([{$sample : {size : 8 } } ])
}


async function createNotification(id , body){
    try {
        await freelancer.updateOne({id : id} , {$push : {notifications : body}})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


async function getNotificationCount(email){
    
    try {
      
        const user = await freelancer.find({email: email})
        const checkNotifications = (notification) => notification.unread === true;
        const listOfNotifications = user[0].notifications.filter(checkNotifications)

        
       
        return listOfNotifications.length


    
        
    } catch (error) {
        console.log(error)
        return false
    }
}

async function getFreelancerByEmail(email){
    try{
        const result =  await freelancer.find({
            email : email
        }, {
            password  : 0 , 
            appliedJobs : 0 , 
            notifications : 0 , 
            connections : 0 , 
            _id : 0 , 
            __v : 0
        })

       


        return result[0]
    }catch(error){
        return false
}
}

async function getAllNotifications(email){

   
try{
   const  result= await freelancer.find({
        email : email 
    } )
    
    await freelancer.updateMany(
        {email : email , "notifications.unread" : true}  , 
        {$set : {"notifications.$.unread" : false}}
    )
   
   
    return  result[0].notifications.reverse()
}catch(error){
    console.log(error)
    return false
}
}

async function getAppliedFreelancer(freelancerId){
    try{
       return await freelancer.findOne({
            id : freelancerId
        } , {
            _id: 0 , 
            connections : 0 , 
            notifications : 0 , 
            appliedJobs : 0 , 
            __v : 0 ,
        })

    }catch(err){
        console.log(err)
        return false
    }
}


async function checkApplied(freelancerId , jobId){
    try{
        const result = await freelancer.findOne(
            {
                id : freelancerId , 
                appliedJobs : jobId
            } , {
                appliedJobs : 1
            }
        )   

   

        return result
    } catch(error){
        console.log(error)
        return false
    }
}

async function searchFreelancer(name){
    
    const pipeline =  [
        {
          $search: {
            index: "name",
            text: {
              query: name,
              path: ["firstName" , "lastName" , "description"],
              
            }
          } , 
        
        } , 
        {
            $project : {
                _id : 0 ,
                appliedJobs : 0 , 
                notifications  : 0 , 
                password  : 0
              } ,
              
        }
      ]



      try{
        const result = await freelancer.aggregate(pipeline)
        return result
      }catch(error){
        console.log(error)
        return false
      }
}

async function pushConnection(id  , email){
    
    try {
        const result  = await freelancer.updateOne(
            { id: id},
            { $push: { connections: email } }
         )
       
       
        return result

    } catch (error) {
       
        return false
    }
}


async function checkConnection(personId ,companyEmail){
    try {
        const result = await freelancer.findOne(
            {
                id : personId ,
                connections : companyEmail
            }
        )
            
            
       
        if(result === null){
           
            return false
        }
       
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

async function getAppliedJobs(email){
        try{
            const result =  await freelancer.find({
                email : email
            } , {
                appliedJobs : 1,
                _id : 0
            })
            console.log(result)
            return result[0]['appliedJobs']

        }catch(error){
            return false
        }
}

async function getProfile(freelancerId){
    try {
        return await freelancer.findOne({
            id : freelancerId
        } , {
              
            _id : 0 , 
            firstName : 1  , 
            lastName : 1 , 
            email : 1 , 
            description : 1 , 
        })
    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    getAppliedFreelancer , 
    getFreelancerByEmail ,
    getAppliedJobs , 
    checkConnection , 
    pushConnection , 
    searchFreelancer , 
    checkApplied , 
    getAllNotifications ,
    getNotificationCount, 
    createNotification, 
    getRandomFreelancers,
    addAppliedJob , 
    createFreelancer , 
    loginFreelancer, 
    getAppliedPeople ,
    getProfile
}