let mongoose=require("mongoose");
let userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:"User",enum:["User","Moderator"]}
},{
    versionKey:false
})

let UserModel=mongoose.model("user",userSchema);
module.exports={UserModel}