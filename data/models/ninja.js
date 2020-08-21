const mongoose = require('mongoose');


const GeoSchema = new mongoose.Schema({
    type:{
        type:String,
        default:'Point'
    },
    coordinates:{
        type:[Number],
        index:'2d'
    }
});
const NinjaSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    age:{
        type:Number,
        required:[true,'age is required']
    },
    belt:{
        type:String,
        required:[true,'Belt is required']
    },
    availability:{
        type:Boolean,
        required:true,
        default:false
    },
    geometry : GeoSchema
});

const NinjaModel =  mongoose.model('ninja',NinjaSchema);

module.exports = NinjaModel;