const express = require("express")
const Freelancer = require("./freelancer.mongoose")
const {passport} = require("./../app")
const {
    httpCheckConnection, 
    httpGetAllFreelancers ,
    httpGetFreelancerById, 
    httpDeleteFreelancer  , 
    httpLoginFreelancer ,
    httpCreateFreelancer , 
    httpGetAppliedPeople, 
    httpGetRandomFreelancers,
    httpCreateNotification , 
    httpGetNotificationCount,
    httpGetAllNotifications, 
    httpSearchFreelancer, 
    httpCheckApplied, 
    httpGetAppliedJobs,
} = require("./freelancer.controller")
const {checkCompany} = require("../components/checkCompany")
const checkLoggedIn = require("../checkLoggedin")







const freelancerRouter = express.Router()

//freelancerRouter.get("/" , consoler , httpGetAllFreelancers)
freelancerRouter.get("/notify" , checkLoggedIn  , httpGetNotificationCount)

freelancerRouter.get("/notifications" , checkLoggedIn , httpGetAllNotifications)

freelancerRouter.get("/appliedjobs" ,  checkLoggedIn , httpGetAppliedJobs )

freelancerRouter.get("/random" , checkCompany , httpGetRandomFreelancers)

freelancerRouter.get("/:id"  , checkCompany ,  httpGetFreelancerById)

freelancerRouter.get("/appliedpeople/:id" , checkCompany , httpGetAppliedPeople)

freelancerRouter.get("/checkapplied/:id" , checkLoggedIn , httpCheckApplied)

freelancerRouter.get("/search/:name"  , httpSearchFreelancer)

freelancerRouter.get("/checkconnection/:id" , checkCompany , httpCheckConnection)

freelancerRouter.post("/signin" , httpCreateFreelancer)

freelancerRouter.post("/login" , httpLoginFreelancer)

freelancerRouter.post("/createnotification/:id" , checkCompany , httpCreateNotification)

freelancerRouter.delete("/:id" , httpDeleteFreelancer)





module.exports = {freelancerRouter} 