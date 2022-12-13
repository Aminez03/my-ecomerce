const User=require("../model/user");
let bc = require('bcryptjs');
let jwt = require('jsonwebtoken');
const config=require("config");
const secret=config.get("secret");

exports.signUp=async(req,res)=>{
    const {fullName,email,password,adresse,telephone,userRole,blocking}=req.body;
    try{
        //verfier existing user avec email
        const exsitingUser= await User.findOne({email});
        if(exsitingUser){res.status(401).json({msg:"User is allready exist "})}
        //ADD NEW USER
        const newUser= new User({fullName,email,password,adresse,telephone,userRole,blocking})
        // cryptage password
        var salt = await bc.genSalt(10);
        var hash = await bc.hashSync(password, salt);
        newUser.password=hash
        await newUser.save()
         //json web token
         const payload={
            id:newUser._id,
            name:newUser.fullName,
            email:newUser.email,
            adresse:newUser.adresse,
            telephone:newUser.telephone,
            blocking:newUser.blocking
        };
        const token = jwt.sign(payload,secret);
        res.status(200).send({
            token,
            user:{
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            password: newUser.password,
            adresse: newUser.adresse,
            telephone:newUser.telephone,
            userRole:newUser.userRole,
            blocking:newUser.blocking
        },
          });
        // res.send(newUser)
    }catch(error){
        res.status(500).json({msg:error})
    }
}

exports.LogIn=async(req,res)=>{
    const {email,password}=req.body;
    try {
        //verification email
        const user= await User.findOne({email});
        if(!user)return res.status(404).json({msg:'coordonnes ghaltin'})
        // verification password 
        const isMatch=await bc.compare(password,user.password)
        if(!isMatch)return res.status(404).json({msg:"coordonnes ghaltin"})
        const payload={
            id:user._id,
            name:user.fullName,
            email:user.email,
            adresse:user.adresse,
            telephone:user.telephone,
            blocking:user.blocking

        };
        const token = jwt.sign(payload,secret);
        res.status(200).send({
            token,
            user:{
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            adresse: user.adresse,
            telephone:user.telephone,
            userRole:user.userRole,
            blocking:user.blocking
            
        },
          });
     
    } catch (error) {
        res.status(500).json({msg:error})        
    }
}

exports.auth=(req,res)=>{
    res.send(req.user)
}


exports.getAllUser = async (req, res) => {
    try {
      const allUsers = await User.find();
      allUsers
        ? res.status(201).json(allUsers)
        : res.status(401).json({ msg: "getAll error" });
    } catch (error) {
      res.status(501).json({ msg: error.message });
    }
  };

  //delete one user
  exports.deleteUser = async (req, res) => {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params._id);
      res.status(201).json({ msg: "user deleted successfully" });
    } catch (error) {
      res.status(501).json({ msg: error.message });
    }
  };
  //edit user to block 
    exports.updateUser = async (req, res) => {
      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params._id,
          { ...req.body },
          { new: true }
        );
        res.status(201).send(updateUser);
      } catch (error) {
        res.status(501).json({ msg: error.message });
      }
    };