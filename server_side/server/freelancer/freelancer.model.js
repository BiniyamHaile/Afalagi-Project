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


async function getFreelancerById(id_num){
    return await freelancer.get(id_num)
}
   


async function deleteFreelancerById(id_num){
    return await  freelancer.delete(id_num)
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
        {email : user.email , name : user.firstName  , department : user.department} , config.COOKIE_KEY
    )
    return res.status(201).json({   user : token})
}
else{
    return res.status(403).json({user : false , message : "passwords didn't match"})
}


}
           
 
async function addAppliedJob(email , job_id){
        try {
           await freelancer.updateOne(
            {email  : email}  , {$push : {appliedJobs : job_id}})

            const me = await freelancer.find({email : email})
           
           return me
        } catch (error) {
            console.log(error)
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


    
        return result
    } catch (error) {
        console.log(error)
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


async function checkApplied(email , jobId){
    try{
        const result = await freelancer.find(
            {
                email : email , 
                appliedJobs : jobId
            }
        )
       
        return result.length
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
       
        console.log("result is ....")
        console.log(result)
        return result

    } catch (error) {
        console.log(error)
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
        console.log("RESULT!!1")
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
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
    getFreelancerById  ,
    deleteFreelancerById , 
    loginFreelancer, 
    getAppliedPeople ,
}