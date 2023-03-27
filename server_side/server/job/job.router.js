const express = require("express")
const jobRouter = express.Router()
const {checkCompany} = require("../components/checkCompany")
const checkLoggedin = require("../checkLoggedin")
const { httpGetDeptJobs , httpSearchJobs , httpGetAppliedJobs , httpIsApplied ,  httpApplyToJob,  httpCreateJob , httpGetAllJobs , httpGetPostedJobs , httpCloseJob , httpGetJobByDepartment, httpGetAppliedPeople} = require("./job.controller")

jobRouter.get("/jobs" , httpGetAllJobs)

jobRouter.get("/postedjobs" , checkCompany ,  httpGetPostedJobs)

jobRouter.get("/departmentjob" , checkLoggedin , httpGetJobByDepartment)

jobRouter.get("/department/:department" , checkLoggedin , httpGetDeptJobs)

jobRouter.get("/appliedjobs" , checkLoggedin , httpGetAppliedJobs)

jobRouter.get("/appliedpeople/:id" , checkCompany , httpGetAppliedPeople)


jobRouter.patch("/closejob/:id" , checkCompany , httpCloseJob )

jobRouter.post("/postjob" , checkCompany , httpCreateJob)

jobRouter.post("/applytojob" , checkLoggedin , httpApplyToJob)

jobRouter.post("/searchjob" , checkLoggedin , httpSearchJobs)


module.exports = {jobRouter}