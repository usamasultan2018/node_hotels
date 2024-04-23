const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{

    // first check the req header have authorization or not..
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"Token not found"})
    }
/// Extract the jwt token from request header...
const token  = req.headers.authorization.split(' ')[1];
if(!token){
    res.status(401).json({error:"Unauthorized"});
}

try{
    // verify jwt token  
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    // attach the user info the request object 
    req.user = decoded
    next();

}
catch(e){
    console.log(err);
 res.status(401).json({error:"Invalid token"})
}
}

// function to generate token
const generateToken = (userData) =>{
    return jwt.sign({userData},process.env.JWT_SECRET);
}
module.exports = {jwtAuthMiddleware,generateToken}