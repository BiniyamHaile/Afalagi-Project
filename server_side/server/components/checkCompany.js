require("dotenv").config()
const jwt = require("jsonwebtoken")

function checkCompany(req, res, next){
    try{
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token , process.env.COOKIE_KEY)
        res.locals.companyName = decoded.name;
        res.locals.companyEmail = decoded.email;
        next()
    }
    catch(e){
        res.status(401).json({user  : false })
    }
}


module.exports = {
    checkCompany, 
}