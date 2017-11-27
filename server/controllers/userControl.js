const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

module.exports={
  signup:(req,res)=>{
    bcrypt.hash(req.body.password,10).then((hash)=>{
      const userData=new User({
        email:req.body.email,
        password:hash
      });
      userData.save().then((response)=>{
        res.send({status:true,msg:response});
      });
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  signin:(req,res)=>{
    User.findOne({
      email:req.body.email
    }).then((response)=>{
      if(response){
        bcrypt.compare(req.body.password,response.password).then((responseHash)=>{
          const loginToken=jwt.sign({userId:response._id},process.env.TOKEN_SECRET);
          res.send({status:true,token:loginToken});
        });
      }else{
        res.send({status:false,msg:"User not found"});
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  }
};
