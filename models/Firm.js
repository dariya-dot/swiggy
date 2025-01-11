const mongoose=require('mongoose');
const Product = require('./Product');

const firmSchema= mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        uniqe:true
    },
    area:{
        type:String,
        require:true
    },
    category:{ 
       type: [
            {   
                type:String,
                enum:['Veg','Non-veg']
            }
        ]   
    },
    region:{
        type: [
             {
                 type:String,
                 enum:['SouthIND','NortIND','Bakery','Chenies']
             }
         ]
     },
     offer:{
        type:String
     },
     image:{
        type:String
     },
    vender:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vender'
        }
     ],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
     }]


})
const Firm=mongoose.model('Firm',firmSchema)
module.exports=Firm;