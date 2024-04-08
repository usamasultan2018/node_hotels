const mongoose = require('mongoose');


const menuItemSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,  
        unique: true, // Email must be unique
    },

    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['Sweet','Spice','Sour'],
    },
    is_drink:{
        type:Boolean,
        default:false,
    },
    ingredients:{
        type:[String],
        default:[],
    },
    num_Sales:{
        type:Number,
        default:0,
    },
});

const MenuItem =  mongoose.model('MenuItem',menuItemSchema);
module.exports = MenuItem;