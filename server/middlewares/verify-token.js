const jwt = require('jsonwebtoken')

// this module will deal with the requests coming from the front end
// token could be in either authorisation or x-access-token field and front end could add Bearer-  as well 
module.exports = function(req,res,next){
    let token = req.headers['x-access-token'] || req.headers ['authorization']
    let checkBearer = "Bearer ";
    
    if(token){
        if(token.startsWith(checkBearer)){
            token = token.slice(checkBearer.length,token.length);
        }
        jwt.verify(token,process.env.SECRET, (err,decoded)=>{
            if(err){
                res.json({
                    success: false,
                    message: "Failed to authenticate"
                })
            }else{
                req.decoded = decoded;
                console.log("Decoded is: "+JSON.stringify(decoded));
                
                //decoded is a user {} which is added to the req and will be used in the one of the route in server in auth.js /auth/user
                next();
            }
        })
    }else{
        res.json({
            success:false,
            message: "No token provided"
        })
    }
}