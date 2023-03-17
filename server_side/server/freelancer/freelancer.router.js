const express = require("express")
const Freelancer = require("./freelancer.mongoose")
const {passport} = require("./../app")
const {
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
} = require("./freelancer.controller")
const {checkCompany} = require("../components/checkCompany")
const checkLoggedIn = require("../checkLoggedin")








const freelancerRouter = express.Router()

//freelancerRouter.get("/" , consoler , httpGetAllFreelancers)
freelancerRouter.get("/notify" , checkLoggedIn  , httpGetNotificationCount)

freelancerRouter.get("/notifications" , checkLoggedIn , httpGetAllNotifications)

freelancerRouter.get("/random" , checkCompany , httpGetRandomFreelancers)

freelancerRouter.get("/:id"  , httpGetFreelancerById)

freelancerRouter.get("/appliedpeople/:id" , checkCompany , httpGetAppliedPeople)



freelancerRouter.post("/signin" , httpCreateFreelancer)

freelancerRouter.post("/login" , httpLoginFreelancer)

freelancerRouter.post("/createnotification/:id" , checkCompany , httpCreateNotification)

freelancerRouter.delete("/:id" , httpDeleteFreelancer)



module.exports = {freelancerRouter} 