const chaiHttp=require("chai-http");
const chai=require("chai").use(chaiHttp);
const expect=chai.expect;
const server=require("../server/app");

let testToken=null;
let articleId=null;
const testEmail="tommybudi1998@gmail.com";
const testPassword="tommyhahahihi";

describe("Test User Blog",function(){
  it("Test Registrasi User",function(done){
    chai.request(server).post("/api/user/signup").send({
      email:testEmail,
      password:testPassword
    }).end(function(req,res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.status(true);
      done();
    });
  });
  it("Test Signin User",function(done){
    chai.request(server).post("/api/user/signin").send({
      email:testEmail,
      password:testPassword
    }).end(function(req,res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.status(true);
      expect(res.body.token).to.have.lengthOf.at.least(1);
      testToken=res.body.token;
      done();
    });
  });
});

describe("Test Blog Article",function(){
  it("Test Buat Artikel",function(done){
    let endpoint="/api/article/create";
    chai.request(server).post(endpoint).set("login_token",testToken).send({
      title:"Test",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet laoreet dolor. Fusce euismod dui purus, eu placerat eros porttitor finibus. Maecenas id dolor diam. Aenean iaculis tortor vitae rhoncus dapibus. Proin a mi quis leo congue consequat. Duis laoreet justo nec mauris interdum fringilla. Suspendisse potenti. Mauris congue non diam eget bibendum. Cras massa nulla, semper nec finibus at, ornare at arcu. Fusce a ex imperdiet, aliquam sapien ac, sollicitudin arcu. Integer ipsum quam, ullamcorper a euismod nec, molestie quis ante."
    }).end(function(req,res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.status(true);
      articleId=res.body.msg._id;
      done();
    });
  });
  it("Get all articles",function(done){
    let endpoint="/api/article/all";
    chai.request(server).get(endpoint).end(function(req,res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.status(true);
      expect(res.body.msg).to.be.a("Array");
      done();
    });
  });
  it("Delete Article",function(done){
    let endpoint=`/api/article/delete/${articleId}`;
    chai.request(server).delete(endpoint).set("login_token",testToken).end(function(req,res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.status(true);
      done();
    });
  });
});
