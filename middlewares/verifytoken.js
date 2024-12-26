const Vender=require('../models/Vender')
const  jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const secretKey=process.env.NAME

const verifytoken=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token) return res.status(401).json({msg:'token not found'}) 
    try {
        const decoded=jwt.verify(token,secretKey)
        
        const vender=await Vender.findById(decoded.venderId)
        console.log(vender)
        if(!vender){return res.status(404).json({messege:"Vender not found"})}
        req.venderId=vender._id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg:"invalid token"})
    }
   
}

module.exports=verifytoken