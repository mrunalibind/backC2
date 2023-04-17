let express=require("express");
const { connection } = require("./db");
let app=express();
app.use(express.json())
require("dotenv").config();

let cookie=require("cookie-parser");
app.use(cookie());
const { userRouter } = require("./routes/user_route");
const { auth } = require("./middleware/auth");
const { blogRouter } = require("./routes/blog_route");
app.use("/user",userRouter)

app.use(auth);
app.use(express.json())
app.use("/blog",blogRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection
       console.log("Connected to DB") 
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running")
})