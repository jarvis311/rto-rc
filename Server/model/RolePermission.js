import mongoose from "mongoose"

const rolePermissionSchema  = new mongoose.Schema({
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },
    permission_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Permission"
    },
    deleted_at:{
        type:String,
        default:null
    }
})

const RolepermissionModal = mongoose.model("Role_Permission",rolePermissionSchema) 
export default RolepermissionModal