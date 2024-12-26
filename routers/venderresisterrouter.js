const express=require('express')
const router=express.Router()
const vendercontroler=require('../controlers/vendercontroler')

router.post('/resister',vendercontroler.venderRegister)
router.post('/login',vendercontroler.venderLogin)
router.get('/all-venders',vendercontroler.getAllVenders)
router.get('/single-vender/:id',vendercontroler.singlevender)

module.exports=router