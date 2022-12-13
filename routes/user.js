
const express=require("express");
const {signUp,LogIn, auth,getAllUser,deleteUser,updateUser}=require("../controllers/user.controller");
const { signUpRules,validator } = require("../middleware/validator");
const verifyAuth = require("../middleware/verifyAuth");

let router=express.Router()
router.post("/signUp",signUpRules(),validator,signUp)
router.post('/signIn',LogIn)
router.get('/auth',verifyAuth,auth)

router.get("/getAllUser", getAllUser);
router.delete("/deleteOneUser/:_id", deleteUser);
router.put("/updateUser/:_id", updateUser);




module.exports = router