import mongoose from "mongoose";

const api_statues_schema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    position:{
        type:Number,
        default:null
    },
    third_party_api:{
        type:String
    },
    status:{
        type:Number,
        default:1
    },
    delete_at:{
        type:String,
        default:null
    },
    delete_by:{
        type:String,
        default:null
    }
},{timestamps:true})

const api_statues = mongoose.model('api_statuses' , api_statues_schema)
export default api_statues