
const cors = require("cors")
const express = require("express")
const freelancer = require("./freelancer/freelancer.mongoose")
const {jobRouter} = require("./job/job.router")
const companyRouter = require("./company/company.router")
const checkLoggedIn = require("./checkLoggedin")
const {freelancerRouter}= require("./freelancer/freelancer.router")




require("dotenv").config()




function middleware(req, res, next){
    console.log("...incoming request")
    next()
}



const app  = express()
const config = {
    COOKIE_KEY : process.env.COOKIE_KEY
}

















app.use(express.json())

app.use(cors())


app.get("/logout" , (req, res)=>{
    req.logOut;
    res.status(200).json({
        ok : true
    })
} ) 





app.use("/freelancer" , middleware , freelancerRouter)






app.use("/company" , companyRouter)











app.use("/job" , jobRouter)


app.get("/user" , checkLoggedIn , async (req , res)=>{
    const user = await freelancer.findOne({
        email : res.locals.email
    })

   

    // res.status(200).json({
    //     loggedIn : true
    // })


    res.status(200).json(user)
})



module.exports =  {app  , config}




