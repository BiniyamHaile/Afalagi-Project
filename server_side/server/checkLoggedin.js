require('dotenv').config()
const jwt = require('jsonwebtoken')


function  checkLoggedIn(req, res , next){
    const token = req.headers['x-access-token']
    
   

    try {
        const decoded = jwt.verify(token , process.env.COOKIE_KEY)
      
       res.locals.email = decoded.email
        res.locals.department = decoded.department
        
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({user  : false })
    }
}


module.exports = checkLoggedIn