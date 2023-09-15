import mongoose from "mongoose"

const persmissionSchema  = new mongoose.Schema({
    module_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Modules"
    },
    permission:{
        type:Number,
        default:1
    },
    deleted_at:{
        type:String,
        default:null
    }
})

const PremissionModal = mongoose.model("Permission",persmissionSchema)
export default PremissionModal