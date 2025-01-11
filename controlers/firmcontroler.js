const Firm=require('../models/Firm')
const multer=require('multer')
const Vender=require("../models/Vender")
const path=require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Set the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Set unique file name
    }
  });
  const upload=multer({storage:storage})

const addFirm=async(req,res)=>{
    
    try {
        const {firmName,area,category,region,offer}=req.body
        const image=req.file?req.file.filename:undefined;
        const vender= await Vender.findById(req.venderId)
       
        if(!vender){
            return res.status(400).json({message:"venders not found"})
        }

        else if(vender.firm.length>0){
          res.status(404).json({message:"You already have a firm."});
          console.log("You already have a firm.")
       } else{
        const firm=new Firm({firmName,area,category,region,offer,image,vender:vender._id})
        const savedfirm= await firm.save()
        const firmId=savedfirm._id

        vender.firm.push(firmId)
        await vender.save()
        await firm.save()
        
        
        res.status(201).json({message:"firm added successfully",firm,firmId})
       }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"internal server error"})
        
    }
}

const deleteFirmById=async()=>{
  try {
    const firmId=req.params.id
    const deletefirm=await Firm.findByIdAndDelete(firmId)
    if(!deletefirm){res.status(404).json({message:"firm not found"})}
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"internal server error"})
  }
}
module.exports= {addFirm:[upload.single('image'),addFirm],deleteFirmById}