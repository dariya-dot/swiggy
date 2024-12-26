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
                enum:['veg','nonveg']
            }
        ]
    },
    image:{
        type:String,
    },
    bestseller:{
        type:String
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
        
    ]
})
const Product = mongoose.model('Product',productSchema)
module.exports=Product