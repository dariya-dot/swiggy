const Product=require('../models/Product')
const multer=require('multer')
const Firm=require('../models/Firm')
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

  const addProduct=async(req,res)=>{
    try {
        const {productName,price,category,bestseller,description}=req.body
        const image=req.file?req.file.filename:undefined;
        const firmId=req.params.firmId
        console.log(firmId)
        const firm= await Firm.findById(firmId)
        if (!firm){
            return res.status(400).json({message: "Firm not found"})
        }
        const product=new Product({productName,price,category,bestseller,description,image,firm:firm._id})
        product.firmname.push(firm.firmName)
        const savedProduct=await product.save()
        firm.product.push(savedProduct)
        await firm.save()
       res.status(201).json({messege:"product uploaded sussfully"})
    } catch (error) {   
        console.error(error)
        res.status(500).json({message:"server error"})
    }
  }
  const getproductbyfirm=async(req,res)=>{
    try {
      const firmId=req.params.firmId
      const firm=await Firm.findById(firmId)
      if(!firm){
        return res.status(404).json({message:"firm not found"})
      }
      const restarentname=firm.firmName
      const products= await Product.find({firm:firmId})
      res.status(200).json({restarentname,products})
    } catch (error) {
      console.error(error)
      res.status(501).json({message:"server error"})
    }
  }

  const deletProduct=async(req,res)=>{
    try {
     const  productId=req.params.productId;
     const  deletepr = await Product.findByIdAndDelete(productId) 
     if(!deletepr){
      return res.status(404).json({message:"product not found"})
     }
     res.status(200).json({message:"product deleted sussfully"})
    } catch (error) {
      console.error(error)
      res.status(501).json({message:"server error"})
    }
  }
module.exports={addProduct:[upload.single('image'),addProduct],getproductbyfirm,deletProduct}