const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const company = require("./company.mongoose")
const uuid = require("uuid")

require("dotenv").config()

const config = {
    COOKIE_KEY : process.env.COOKIE_KEY
}



async function createCompany(body){
    
    const existObj =   await company.find({email : body.email})


    hashedPassword = await bcrypt.hash(body["password"] , 10)

    body["password"] =hashedPassword; 
    body['id'] = uuid.v4()

    try {
        if (!existObj.length){
            await company.findOneAndUpdate({email : body.email} , body , {upsert : true})
            return true
        
          } else if(existObj.length){
            return "this email already exist!"
          }
          else{
            return "Invalid credentials!"
          }
    } catch (error) {
        
        return false
    }
}


async function loginCompany(req , res){
    const user = await  company.findOne({
        email : req.body.email 
    })
         
    if(!user){
        return res.status(403).json({user : false , message : "email doesn't exist"}) //no user , so check the email!
    }   
    else if(await bcrypt.compare(req.body.password , user.password )){
        const token = jwt.sign(
            {email : user.email , name : user.name , id : user.id} , config.COOKIE_KEY
        )
        return res.status(201).json({   user : token})
    }
    else{
        return res.status(403).json({user : false , message : "passwords didn't match"})
    }
}



async function postJob(companyEmail , jobId){
    try{
         await company.updateOne({
            email : companyEmail
        } , {
            $push : {
                jobsPosted : jobId
            }
        })
        return true
    }catch(e){
        console.log(e)
        return false
    }
}


async function getPostedJobs(id){
    console.log(id)
    try {
        const result = await   company.findOne({
            id : id
        }, 
        {_id : 0 , 
        jobsPosted : 1})
            console.log("result is .....")
            console.log(result)
            return result['jobsPosted']

    } catch (error) {
        console.log(error)
        return false
    }

}


module.exports = {
    createCompany , loginCompany , postJob  , getPostedJobs
}