const jwt = require("jsonwebtoken");
const { BlackModel } = require("../model/blacklist_model");

let auth=async(req,res,next)=>{
    let {token}=req.cookies;
    let tokenBlacklistCheck=await BlackModel.findOne({token:token});
    if(tokenBlacklistCheck){
        return res.status(400).send({msg:"Login Again"})
    }

    let tokenValid=jwt.verify(token,"token")
    // console.log("tokenValid",tokenValid)
    if(tokenValid){
        req.body.userEmail=tokenValid.email;

        // console.log(req.body,"auth")
        next();
    }
}
module.exports={auth}