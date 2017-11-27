const router=require("express").Router();
const userControl=require("../controllers/userControl");

// User Signup
router.post("/signup",userControl.signup);

// User Signin
router.post("/signin",userControl.signin);

module.exports=router;
