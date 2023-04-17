let express=require("express");
const { UserModel } = require("../model/user_model");
let userRouter=express.Router();
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken");
const { BlackModel } = require("../model/blacklist_model");

userRouter.post("/register",async(req,res)=>{
    let {name,email,password,role}=req.body;
    try {
        let user=await UserModel.findOne({email})
        if(user){
            return res.status(400).send({msg:"User is already exists"})
        }
        bcrypt.hash(password,5,async function(err,hash){
            let user=new UserModel({name,email,password:hash,role})
            await user.save();
            res.status(200).send({msg:"Registration Succcessfull"})
        })
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                    let token=jwt.sign({email:user.email,role:user.role},"token",{
                        expiresIn:'10m'
                    })
                    // console.log("token",token)
                    let refreshToken=jwt.sign({email:user.email,role:user.role},"refreshToken",{
                        expiresIn:'20m'
                    })
                    res.cookie("token",token,{maxAge:1000*60})
                    res.cookie("refreshToken",refreshToken,{maxAge:1000*60*3})
                    res.send({msg:"Login Successful"});
                    
                }
            })
        }
    } catch (error) {
        res.status(500).send({msg:error.message})  
    }
})

userRouter.get("/logout",async(req,res)=>{
    try {
        let {token,refreshToken}=req.cookies;
        // console.log(token,refreshToken)
        let blacklist=new BlackModel(token);
        let blacklistRefresh=new BlackModel(refreshToken);
        await blacklist.save();
        await blacklistRefresh.save();
        res.send({msg:"LogOut Successfull"});

    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

userRouter.get("/refresh-token",async(req,res)=>{
    let refreshToken=req.cookies.refreshToken

    let isRefreshTokenBlack=await BlackModel.findOne({token:refreshToken})
    if(isRefreshTokenBlack){
        res.status(400).send({msg:"Login Again"});
    }
    let valid=jwt.verify(refreshToken,"refreshToken")

    let newToken=jwt.sign({userEmail:valid.email,role:valid.role},"token",{
        expiresIn:'10m'
    })
    res.cookie("token",newToken,{maxAge:1000*60})
    res.status(200).send({msg:"Token Generated"});

})

module.exports={userRouter}