const { getRandomFreelancers ,  createFreelancer , getFreelancerById  , deleteFreelancerById, loginFreelancer , getAppliedPeople} = require("./freelancer.model");

async function httpCreateFreelancer(req , res){
    const body  = req.body
   
    const returned  = await  createFreelancer(body);

    if(returned === true){
        res.status(201).json({
            ok : returned
        })
    } else{
        res.status(400).json({
            message : returned
        })
    }

}


function  httpGetFreelancerById(req  ,res){
//    const id = +req.params.id
//     const freelancer = getFreelancerById(id)
//     console.log(freelancer)
//     res.status(200).json(freelancer)

}


function httpDeleteFreelancer(req  ,res){
    // const id = +req.params.id
    // deleteFreelancerById(id)
    // // check if the freelancer exist in the database
    // res.status(201).json({
    //     ok : true
    // })
}

function httpGetAllFreelancers(){

}

async function httpLoginFreelancer( req , res){

        return await loginFreelancer(req, res)
   
     }
     
     
async function httpGetAppliedPeople(req, res){
    const id = req.params.id
    const result = await getAppliedPeople(id)
    
    if(result){
        return res.status(200).json({result})
    }
    else{
        return res.status(400).json({ok : false})
    }
}     
     




async function httpGetRandomFreelancers(req, res){
    console.log("... Incoming request ... ")
    result = await getRandomFreelancers()
    if(result){
      return  res.status(200).json(result)
    }
    else{
       return res.status(400).json({ok : false})
    }
}





module.exports = {
    httpGetRandomFreelancers , 
    httpCreateFreelancer , 
    httpDeleteFreelancer , 
    httpGetAllFreelancers , 
    httpGetFreelancerById , 
    httpLoginFreelancer , 
    httpGetAppliedPeople, 

}