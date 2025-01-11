const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        require:true
    },
    category:{
        type: [
            {
                type:String,
                enum:['Veg','Non-Veg']
            }
        ]
    },
    image:{
        type:String,
    },
    bestseller:{
        type:Boolean
    },
    description:{
        type:String
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }],
    firmname:[{type:String,
        ref:'Firm'}
        
    ],
    vendername:[
        {
            type:String,
            ref:'Vender'
        }
    ]
})
const Product = mongoose.model('Product',productSchema)
module.exports=Product