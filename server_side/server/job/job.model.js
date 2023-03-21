const uuid4 = require("uuid")
const job = require("./job.mongoose")




async function createJob(jobObj){
    if(!jobObj.title || !jobObj.department || !jobObj.description || !jobObj.location   || !jobObj.deadline 
        ){
           
       
            return false            
        }
    jobObj.deadline = new Date(jobObj.deadline)
    jobObj.dateCreated = new Date()
    jobObj.id = uuid4.v4()
  return  await job.create(jobObj)
  

}







async function deleteJobById(job_id){
  await  job.deleteOne({
        id : job_id
    })
}

async function applyToJob(job_id , email){
    try{
       result =  await job.findOneAndUpdate(
            { id: job_id },
            { $push: { personsApplied: email } } ,   {upsert : true}
         )
       
      return result
    

    }
    catch(e){
        console.log(e)
        return false
    }
}


async function getPostedJobs(companyName){
    const postedJobs =  await job.find(
        {companyName : companyName}
    )
    return postedJobs
}

async function getAllJobs(){
    return await job.find({})
}




async function closeJob(id , name){
    console.log(id)
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
           })
    }
    catch(e){
        console.log(e)
        return false
    }
}


async function getAppliedJobs(email){
    try{
        return await job.find({
            personsApplied : email
        })
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
              path: {
                wildcard: "*"
              },
              fuzzy : {} ,
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
        console.log("result is ...")
        return result
    } catch (error) {
        console.log(error) 
        return false       
    }

}

module.exports = {
    searchJobs , 
    getAppliedJobs , 
    closeJob , 
    getPostedJobs , 
    createJob , 
    deleteJobById,
    applyToJob , 
    getAllJobs ,
    getJobByDepartment,
}


