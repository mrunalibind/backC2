let express=require("express");
const { BlackModel } = require("../model/blacklist_model");

let blogRouter=express.Router();

blogRouter.post("/create",async(req,res)=>{
    
    try {
        console.log("request",req.body)
        
        let newBlog=new BlackModel(req.body);
        await newBlog.save();
        res.status(200).send({msg:"Blog Created"})
    } catch (error) {
        res.status(200).send({msg:error.message})
    }
})

blogRouter.patch("/update/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        await BlackModel.findByIdAndUpdate({_id:Id},req.body);
        res.status(200).send({msg:"Blog Updated"})
    } catch (error) {
        res.status(200).send({msg:error.message})
    }
})

blogRouter.delete("/delete/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        await BlackModel.findByIdAndDelete({_id:Id});
        res.status(200).send({msg:"Blog Deleted"})
    } catch (error) {
        res.status(200).send({msg:error.message})
    }
})

module.exports={blogRouter}