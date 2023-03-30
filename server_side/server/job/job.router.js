const express = require("express")
const jobRouter = express.Router()
const {checkCompany} = require("../components/checkCompany")
const checkLoggedin = require("../checkLoggedin")
const {httpGetJobById,  httpAcceptFreelancer ,  httpGetDeptJobs,  httpSearchJobs , httpGetAppliedJobs  ,  httpApplyToJob,  httpCreateJob , httpGetAllJobs , httpGetPostedJobs , httpCloseJob , httpGetJobByDepartment, httpGetAppliedPeople, httpGetAppliedJob} = require("./job.controller")

jobRouter.get("/jobs" , httpGetAllJobs)



jobRouter.get("/postedjobs" , checkCompany ,  httpGetPostedJobs)

jobRouter.get("/departmentjob" , checkLoggedin , httpGetJobByDepartment)

jobRouter.get("/department/:department" , checkLoggedin , httpGetDeptJobs)

jobRouter.get("/appliedjobs" , checkLoggedin , httpGetAppliedJobs)

jobRouter.get("/appliedpeople/:id" , checkCompany , httpGetAppliedPeople)

jobRouter.get("/appliedjob/:id" , checkLoggedin , httpGetAppliedJob)

jobRouter.get("/postedjob/:id" , checkCompany , httpGetJobById )

jobRouter.patch("/closejob/:id" , checkCompany , httpCloseJob )

jobRouter.post("/postjob" , checkCompany , httpCreateJob)

jobRouter.post("/applytojob" , checkLoggedin , httpApplyToJob)

jobRouter.post("/searchjob" , checkLoggedin , httpSearchJobs)

jobRouter.post("/acceptfreelancer" , checkCompany ,httpAcceptFreelancer )
module.exports = {jobRouter}