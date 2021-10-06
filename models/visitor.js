const  mongoose  = require("mongoose")

const visitorSchema=new mongoose.Schema({
    name:{
        required:true,
        trim:true,
        type:String
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:Number,
        required:true
    },
    date: { 
        type: Date,
         default: Date.now
         },
   checkedIn:{
       type:String,
       default:'YES'
   }
});
const visitor=mongoose.model('visitor',visitorSchema);
module.exports=visitor;