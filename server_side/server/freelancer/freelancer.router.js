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
} = require("./freelancer.controller")
const {checkCompany} = require("../components/checkCompany")






const freelancerRouter = express.Router()

freelancerRouter.get("/" , httpGetAllFreelancers)

freelancerRouter.get("/random" , checkCompany , httpGetRandomFreelancers)

freelancerRouter.get("/:id"  , httpGetFreelancerById)

freelancerRouter.get("/appliedpeople/:id" , checkCompany , httpGetAppliedPeople)

freelancerRouter.post("/signin" , httpCreateFreelancer)

freelancerRouter.post("/login" , httpLoginFreelancer)


freelancerRouter.delete("/:id" , httpDeleteFreelancer)



module.exports = {freelancerRouter} 