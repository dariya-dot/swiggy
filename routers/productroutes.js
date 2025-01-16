const express=require("express")
const productcontroler=require("../controlers/productcontroler")
const path=require('path')

const router=express.Router()
router.post('/add-product/:firmId',productcontroler.addProduct)
router.get('/:firmId/product',productcontroler.getproductbyfirm)
router.delete('/:productId',productcontroler.deletProduct)

router.get('/uploads/:imageName', (req, res) => {   
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));

});

module.exports=router
