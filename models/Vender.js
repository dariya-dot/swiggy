const mongoose=require('mongoose')

const venderSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
        type:String,
        require:true,
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
    
})
const vender=mongoose.model('Vender',venderSchema)
module.exports=vender;