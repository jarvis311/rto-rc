import mongoose from "mongoose";
const RC_blockSchema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
     },
    reg_no:{
        type:String,
    },
    status:{
        type:Number,
        default:1
    }
})

const RC_modal = mongoose.model('Rc_block' , RC_blockSchema)
export default RC_modal