const 
    {
        createJob , 
       getAppliedJobs ,
        deleteJobById,
        applyToJob , 
        getPostedJobs,
        getAllJobs,   
        closeJob ,     
        getJobByDepartment , 
        searchJobs,
        getJobById,
        getAppliedPeople,
       
    }
 = require("./job.model")




 const {addAppliedJob , checkApplied, getFreelancerByEmail} = require("../freelancer/freelancer.model")
const { application } = require("express")



async function httpCreateJob(req , res){
    const body  = req.body
    body['companyName'] = res.locals.companyName
   const value =  await createJob(body)
   
   if(value){
    res.status(201).json({created : true})
   }else{
    res.status(409).json({created : false})
   }
}



function httpGetAppliedPeople(req , res){
    // TODO
}


async function  httpDeleteJobById(req, checkCompany , res){
    //TODO
    id = +req.params.id
    result = await deleteJobById(id)    
    if(result){
       return res.status(200).json({ok : true})
    }
    return res.status(400).json({ok : false})
}

async function httpGetAllJobs(req,  checkLoggedIn, res){
    const result = await getAllJobs()
    return res.status(200).json(result)
}

async function httpGetPostedJobs(req ,  res){
    const jobs = await getPostedJobs(res.locals.companyName)
    return res.status(201).json(jobs)
}



async function httpCloseJob(req, res){ //should be modified so that it uses company email instead of name for security reasons
    //const email = res.locals.email 
    const id = req.params.id 
    const name = res.locals.companyName
    const value = await closeJob(id, name)
    if(value){
        res.status(200).json(value)
    }else{
        res.status(400).json({message : "Operation failed!"})
    }
}   


async function httpGetJobByDepartment(req ,  res){
    const value = await getJobByDepartment(res.locals.department)
    if(value){
        res.status(200).json(value)
    }   
    else{
        res.status(404).json({ok : false})
    }
}


async function httpGetDeptJobs(req , res){
 
    const value = await getJobByDepartment(req.params.department)
    if(value){
        res.status(200).json(value)
    }   
    else{
        res.status(404).json({ok : false})
    }    
}

async function httpApplyToJob(req, res){
    let result;
    let add;  

    email = req.body.email ;
    jobId = req.body.id
    freelancerId= req.body.personId
    //body = await getFreelancerByEmail(email);
    
    // let application = body.toObject()

    
    
    
     
    
    // application['response'] = "pending"
    // console.log("application is")
    // console.log(application)
 //   job = await getJobById(jobId)
  
  
  TODO
    // const checkApply = await checkApplied(email , id)
 

    if (!checkApply){
       
        result  =  await applyToJob(id , application)
        add = await addAppliedJob(freelancerId , jobId)
    }
    if(result && add){
        console.log("result and add")
        res.status(200).json({ok : true})
    }else{
        res.status(400).json({ok : false})
    }
}





async function httpGetAppliedJobs(req , res){
   
    
    const email = res.locals.email
        
        

        const result = await getAppliedJobs(email)


        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(400).json({ok : false})
        }
}

async function httpSearchJobs(req ,res){
    const title = req.body.title
    const result = await searchJobs(title)
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json({ok : false})
    }
} 

async function httpGetAppliedPeople(req, res){
    jobId = req.params.id


    console.log("request reached here")
    result = await getAppliedPeople(jobId)

    if(result){
       return res.status(200).json(result)
    }else{
       return  res.status(200).json({})
    }
}

module.exports = {
    httpGetAppliedPeople , 
    httpApplyToJob , 
    httpCloseJob , 
    httpGetPostedJobs,
    httpCreateJob , 
    httpDeleteJobById , 
    httpApplyToJob , 
    httpGetAllJobs,
    httpGetJobByDepartment,
    httpGetAppliedJobs,
    httpSearchJobs, 
    httpGetDeptJobs
}