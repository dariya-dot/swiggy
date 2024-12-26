const express=require("express")
const productcontroler=require("../controlers/productcontroler")


const router=express.Router()
router.post('/add-product/:firmId',productcontroler.addProduct)
router.get('/:firmId/product',productcontroler.getproductbyfirm)
router.delete('/:productId',productcontroler.deletProduct)
router.get('/uploads:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(Path.join(__dirname,'..','uploads',imageName))
} )

module.exports=router
