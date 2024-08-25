const express = require("express")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const UserModel = require("../models/user.model")

const BlacklistModel = require("../models/blacklist.model")

const userRoute = express.Router()

userRoute.post("/registers", async(req,res)=>{
 
    const {username,password,role} = req.body
    try {
        bcrypt.hash(password,5, async function(err,hash){

            if(err){
                res.status(500).json({message:"err in hash password"})
            }else{
            const user = new UserModel({
                username,
                password:hash,
                role

            })
            await user.save()
            res.status(201).json({message:"user register successfully"})
            }
        
        })
        

            
    
    } catch (error) {
        res.status(400).json({message:"err in register"})
    }

})
userRoute.post("/login", async(req,res)=>{
const{username,password} =req.body



try {
    const user = await UserModel.findOne({username})
    if(!user){
        res.status(404).json({message:"User not found"})
    }
    if(user){
        bcrypt.compare(password,user.password,function(err,result){
            if(err){
                 res.status(403).json({message:"password not match"})
             }
             if(result){
                const token = jwt.sign({id:user._id},process.env.SECRET_KEY1)
          
           
                 res.status(200).json({message:"login sucessfull",token})
             
            
             }
        })
    }
    
} catch (error) {
    res.status(403).json({message:"error in login"})
}


})
userRoute.post("/logout",async(req,res)=>{
const token = req.headers.authorization.split(" ")[1]
if(token){
try {
    await BlacklistModel.create({token})
    res.status(200).json({ message: "Logged out successfully" });

} catch (error) {
    res.status(500).json({ message: "Error logging out" });

}
}

})
module.exports = userRoute

