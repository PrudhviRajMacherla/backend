// this middleware will check if the user is authenticated
const jwt = require("jsonwebtoken");
exports.authMiddleware = async(req,res,next)=>{
    const token = req.headers?.["authorization"];
    if(!token){
    return res.status(401).json({success:false,message:"Unauthorized"});
    }
    try{
        // from this we will get entire payload
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({success:false,message:"Unauthorized"});
    }
}