import mongoose from "mongoose";

const Car_info_RC_schema = new mongoose.Schema({
php_id: {
    type: Number,
    default: 0
    },
date:{
    type:Date,
    default:null
},
rto_to_carinfo_success:{
    type:Number,
    default:0
},
rto_to_carinfo_fail:{
    type:Number,
    default:0
},
type:{
    type:Number,
    default:0
},
carinfo_to_rto_success:{
    type:Number,
    default:0
},
carinfo_to_rto_fail:{
    type:Number,
    default:0
},
})

const Car_info_modal = mongoose.model('carinfo_api_calling_info' , Car_info_RC_schema)
export default Car_info_modal