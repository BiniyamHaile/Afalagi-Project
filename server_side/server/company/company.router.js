const express = require("express")
const  {
    httpCreateCompany ,
     httpLoginCompany , 
    }  = require("./company.controller")

const companyRouter = express.Router() 



companyRouter.post('/login' , httpLoginCompany)
companyRouter.post('/signin' , httpCreateCompany)



module.exports = companyRouter