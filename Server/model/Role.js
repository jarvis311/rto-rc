import mongoose from "mongoose"

const roleSchema  = new mongoose.Schema({
    name:String,
    permission_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Permission"
    }],
    deleted_at:{
        type:String,
        default:null
    }
})

const RoleModal = mongoose.model("Role",roleSchema) 
export default  RoleModal