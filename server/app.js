const mongoose=require("mongoose");
const app=require("express")();
const parser=require("body-parser");
const dotenv=require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017/blog");
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

const api=require("./routes/articleRoute");
app.use("/api/article",api);

const user=require("./routes/userRoute");
app.use("/api/user",user);

app.listen(3000,()=>{
  console.log("Server started! Listenning on port 3000!");
});

module.exports=app;
