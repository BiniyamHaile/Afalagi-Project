const express = require("express")
const jobRouter = express.Router()
const {checkCompany} = require("../components/checkCompany")
const checkLoggedin = require("../checkLoggedin")
const {httpGetAppliedJobs ,  httpApplyToJob,  httpCreateJob , httpGetAllJobs , httpGetPostedJobs , httpCloseJob , httpGetJobByDepartment} = require("./job.controller")

jobRouter.get("/jobs" , httpGetAllJobs)

jobRouter.get("/postedjobs" , checkCompany ,  httpGetPostedJobs)

jobRouter.get("/departmentjob" , checkLoggedin , httpGetJobByDepartment)

jobRouter.get("/appliedjobs" , checkLoggedin , httpGetAppliedJobs)

jobRouter.patch("/closejob/:id" , checkCompany , httpCloseJob )

jobRouter.post("/postjob" , checkCompany , httpCreateJob)

jobRouter.post("/applytojob" , checkLoggedin , httpApplyToJob)




module.exports = {jobRouter}