const uuid4 = require("uuid")
const job = require("./job.mongoose")





async function createJob(jobObj){
    if(!jobObj.title || !jobObj.department || !jobObj.description || !jobObj.location   || !jobObj.deadline 
        ){
           
       
            return false            
        }
    jobObj.deadline = new Date(jobObj.deadline)
    jobObj.dateCreated = new Date()



    // jobObj.id = uuid4.v4()
    await job.create(jobObj)
    return true
  

}







async function deleteJobById(job_id){
  await  job.deleteOne({
        id : job_id
    })
}

async function applyToJob(job_id , body){
   
    
    
    
    
    try{
       result =  await job.findOneAndUpdate(
            { id: job_id },
            { $push: { personsApplied: body } } ,   {upsert : true}
         )
       
      return result
    

    }
    catch(e){
        console.log(e)
        return false
    }
}


// not efficient!

// async function getPostedJobs(companyName){
//     const postedJobs =  await job.find(
//         {companyName : companyName}
//     )
//     return postedJobs
// }

async function getAllJobs(){
    return await job.find({})
}




async function closeJob(id , name){
    
    try{

        const result =  await job.findOne({
            id : id
        })

        

         await job.updateOne(
            {
                id : id , 
                companyName : name
            } , 
            {$set : {status : "Closed"}}
        )

        return job.findOne({id : id})
    }
    catch(e){
        console.log(e)
        return false
    }
}




async function getJobByDepartment(department){
    try{
        return await job.find({
            department : department
           }).sort({dateCreated: -1 , status  : -1})
    }
    catch(e){
       
        return false
    }
}


async function getAppliedJobs(email){
    try{
        return await job.find({
            personsApplied : email
        }).sort({_id : -1})
    }catch(e){
        console.log(e)
        return false
    }
}



async function searchJobs(title){
  


    const pipeline =  [
        {
          $search: {
            index: "Description",
            text: {
              query: title,
              path: ["title" , "description" , "companyName"],
              
            }
          } , 
        
        } , 
        {
            $project : {
                _id : 0 ,
                personsApplied : 0
              } ,
              
        }
      ]
    try {
        const result = await job.aggregate(pipeline)
      
        return result
    } catch (error) {
        console.log(error) 
        return false       
    }

}


async function getJobById(jobId){
    try {
        result = await job.findOne({
            id : jobId
        }).lean();
        return result
    } catch (error) {
        return false
    }
}



async function getAppliedPeople(jobId){

    
    try{
        result = await job.findOne({
            id : jobId
        } , {
            _id : 0 , 
            personsApplied : 1
        })

        


        return result['personsApplied']
    }catch(err){
        console.log(err)
        return false
    }
}



async function acceptFreelancer(jobId , companyName , freelancerId){
    try {

        console.log(jobId , companyName , freelancerId)
        const result =  await job.updateOne({
            id : jobId , 
            companyName : companyName ,
            "personsApplied.id" : freelancerId

        } , {
            $set : {"personsApplied.$.response":   "Accepted"}
        })
        
       
        return result
    } catch (error) {
        console.log(error)
        return result
    }
}



async function getAppliedJob(jobId){
    try {
        return await job.find({
            id : jobId
        } , {
            _id : 0 , 
            personsApplied : 0
        })
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports = {
    getAppliedJob , 
    acceptFreelancer ,     
    getAppliedPeople , 
    getJobById , 
    searchJobs , 
    getAppliedJobs , 
    closeJob , 
  //  getPostedJobs , 
    createJob , 
    deleteJobById,
    applyToJob , 
    getAllJobs ,
    getJobByDepartment,
}


