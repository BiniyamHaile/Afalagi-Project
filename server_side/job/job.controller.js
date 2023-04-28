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
        acceptFreelancer,
        getAppliedJob
      
       
    }
 = require("./job.model")

 const {addAppliedJob , checkApplied, getFreelancerByEmail, createNotification} = require("../freelancer/freelancer.model")

const uuid = require("uuid")
const { postJob } = require("../company/company.model")


async function httpCreateJob(req , res){
    const companyEmail = res.locals.companyEmail
    const id = uuid.v4()
    const body  = req.body
    body['companyName'] = res.locals.companyName
    body['id'] = id

   const value =  await createJob(body)
   const register = await postJob(companyEmail  , id)
 
   if(value & register){

 
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

    // Give id for company too!


    // const companyEmail = res.locals.companyEmail
    // return res.status(201).json(jobs)
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
  
   
    const application = {id : freelancerId  ,  response : "Pending"}

    
    
    
     
    
   
  
  
  
   const checkApply = await checkApplied(freelancerId , jobId)
    

    if (!checkApply){
     
        result  =  await applyToJob(jobId , application)
        add = await addAppliedJob(freelancerId , jobId)
    }
    if(result && add){
        
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


    
    result = await getAppliedPeople(jobId)

    if(result){
       return res.status(200).json(result)
    }else{
       return  res.status(200).json({})
    }
}


async function httpAcceptFreelancer(req , res){
    companyEmail = res.locals.companyEmail
    companyName = res.locals.companyName
    body = req.body
  
    
    jobId = body['jobId']
    freelancerId = body['freelancerId'] 
    body['contain']['companyName'] = companyName
    body['contain']['email'] =companyEmail
    body['contain']['unread'] = true 
    const contain = body['contain']

   
    
    result  = await acceptFreelancer(jobId  , companyName , freelancerId)

    if(result){
        await createNotification(freelancerId , contain)
        return res.status(200).json({ok : true})
    }else{
        return res.status(400).json({ok : false})
    }
}

async function httpGetJobById(req, res){
    id = req.params.id

    result = await getJobById(id)

    if(result){
        return res.status(200).json(result)
    }else{
        return res.status(400).json(result)
    }
}

async function httpGetAppliedJob(req , res){
    id = req.params.id

    result = await getAppliedJob(id)

    if(result){
        return res.status(200).json(result)
    }else{
        return res.status(400).json(result)
    }
}
module.exports = {
    httpGetAppliedJob ,
    httpGetJobById , 
    httpAcceptFreelancer,
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