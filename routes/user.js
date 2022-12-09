
const express=require("express");
const {signUp,LogIn, auth}=require("../controllers/user.controller");
const { signUpRules,validator } = require("../middleware/validator");
const verifyAuth = require("../middleware/verifyAuth");

let router=express.Router()
router.post("/signUp",signUpRules(),validator,signUp)
router.post('/signIn',LogIn)
router.get('/auth',verifyAuth,auth)




module.exports = router