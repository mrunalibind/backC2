let mongoose=require("mongoose");

let blackListSchema=mongoose.Schema({
    token:{type:String,required:true}
})

let BlackModel=mongoose.model("black",blackListSchema);
module.exports={BlackModel}