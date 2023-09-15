import mongoose from "mongoose"

const webModuleSchema = new mongoose.Schema({
    name:String,
    route:String,
    deleted_at:{
        type:String,
        default:null
    }
})

const webModuleModl = mongoose.model("Modules",webModuleSchema) 
export default webModuleModl