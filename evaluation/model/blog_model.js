let mongoose=require("mongoose");

let bolgSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    userEmail:String
},{
    versionKey:false
})

let BlogModel=mongoose.model("blog",bolgSchema);

module.exports={BlogModel}