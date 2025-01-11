const express=require('express')
const Vender=require('../models/Vender')
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs')
const dotEnv=require('dotenv')
const firm=require('../models/Firm')

dotEnv.config()
const secreatKey=process.env.NAME

const venderRegister=async(req,res)=>{
    const {userName,email,password}=req.body
    try {
        const venderEmail=await Vender.findOne({email})
        if(venderEmail) {
            res.status(400).json({message:"Email alredy exist from back end"}),
            console.log("email alredy used in backend")
        
        }
        else{const hashedPassword=await bcrypt.hash(password,10)
            const newVender =new Vender(    
            {userName,email,password:hashedPassword},
            
            )
            await newVender.save()
        
        
    
    res.status(201).json({message:"Vender registerd successfully this msg is from backend",data:newVender})
    console.log('resisterd in backed')} 

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server erroer"})
        
    }

}

const venderLogin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const vender=await Vender.findOne({email})
        if(!vender){return res.status(400).json({message:"email not registerd"})}
        else if(!vender || !(await bcrypt.compare(password,vender.password))){
            return res.status(401).json({message:"invalid username or password"})
        }
       
        
        const token=jwt.sign({venderId:vender._id},secreatKey,{expiresIn:'5m'})
        const venderId=vender._id
        const venderName=vender.userName
    
        
        console.log(venderId)
        res.status(201).json({message:"login sussfull",token,venderId,venderName})
        
    } catch (error) {
        console.error(error)
    }
}
const getAllVenders=async(req,res)=>{
    try {
        const venders=await Vender.find().populate('firm')
        res.json({venders})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"serevr error"})
    }
}

const getVendorById=async(req,res)=>{
    const venderId=req.params.venderId;
    try {
        const vender=await Vender.findById(venderId).populate('firm')
        if(!vender){
            return res.status(404).json({message:"vender not found"})
        }
         if (vender.firm.length!==0){const venderFirmId=vender.firm[0]._id
            res.status(200).json({vender,venderFirmId})
                    console.log("vender firm id from back end",venderFirmId)
            } 
                
                
        
            

    } catch (error) {
         console.error(error)
        res.status(500).json({message:"serevr error"})
    }
}
module.exports={venderRegister,venderLogin,getAllVenders,getVendorById}