const {createCompany , loginCompany} = require("./company.model") 
async function httpCreateCompany(req, res){
    const body = req.body
    const returned  = await createCompany(body);

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

async function httpLoginCompany(req, res){
    return await loginCompany(req, res)
}

module.exports = {
    httpCreateCompany ,
     httpLoginCompany , 
    }