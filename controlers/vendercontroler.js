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
        if(venderEmail) {return res.status(400).json("Email alredy exist")}
        const hashedPassword=await bcrypt.hash(password,10)
        const newVender =new Vender(
            {userName,email,password:hashedPassword}
        )
        await newVender.save()
    
        res.status(201).json({message:"Vender registerd successfully"})
        console.log('resisterd')
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server erroer"})
        
    }

}

const venderLogin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const vender=await Vender.findOne({email})
        if(!vender || !(await bcrypt.compare(password,vender.password))){
            return res.status(401).json({message:"invalid username or password"})
        }
        
        const token=jwt.sign({venderId:vender._id},secreatKey,{expiresIn:'1h'})
        const venderId=vender._id
        console.log(venderId)
        res.status(201).json({message:"login sussfull",token,venderId})
        
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

const singlevender=async(req,res)=>{
    const venderId=req.params.id;
    try {
        const singlevender=await Vender.findById(venderId).populate('firm')
        if(!singlevender){
            return res.status(404).json({message:"vender not found"})
        }
        res.status(200).json({singlevender})
    } catch (error) {
         console.error(error)
        res.status(500).json({message:"serevr error"})
    }
}
module.exports={venderRegister,venderLogin,getAllVenders,singlevender}