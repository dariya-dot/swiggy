const express=require('express')
const router=express.Router()
const firmcontroller=require('../controlers/firmcontroler')
const verifytoken=require('../middlewares/verifytoken')


router.post('/add-firm', verifytoken ,firmcontroller.addFirm)
router.delete('/:firmId' ,firmcontroller.deleteFirmById)
router.get('/uploads:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
} )


module.exports = router;