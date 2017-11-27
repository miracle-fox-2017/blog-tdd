const Article=require("../models/articleModel");
const ObjectId=require("mongoose").Types.ObjectId;
const jwt=require("jsonwebtoken");

module.exports={
  create:(req,res)=>{
    if(req.headers.login_token != null){
      const userId=jwt.verify(req.headers.login_token,process.env.TOKEN_SECRET).userId;
      new Article({
        title:req.body.title,
        content:req.body.content,
        authorId:userId
      }).save().then((response)=>{
        res.send({status:true,msg:response});
      }).catch((err)=>{
        res.send({status:false,msg:err});
      });
    }else{
      res.send({status:false,msg:"Invalid login token!"});
    }
  },
  all:function(req,res){
    Article.find().then((articles)=>{
      res.send({status:true,msg:articles});
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  delete:function(req,res){
    if(req.headers.login_token != null){
      const userId=jwt.verify(req.headers.login_token,process.env.TOKEN_SECRET).userId;
      Article.findOne({
        "_id":ObjectId(req.params.id)
      }).then((article)=>{
        if(article == null){
          res.send({status:false,msg:"Article not found!"});
        }else{
          Article.deleteOne({
            "_id":ObjectId(req.params.id)
          }).then((response)=>{
            res.send({status:true,msg:response});
          });
        }
      }).catch((err)=>{
        res.send({status:false,msg:err});
      });
    }else{
      res.send({status:false,msg:"Invalid login token!"});
    }
  }
};
