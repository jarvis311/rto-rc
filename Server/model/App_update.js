import mongoose from "mongoose"

const App_updateSchema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    title:{
        type:String,
    },
    version_code:{
        type:String
    },
    current_version:{
        type:String
    },
    package_name:{
        type:String
    },
    start_io_ads_enable:{
        type:Number
    },
    affilation_program_enable:{
        type:Number
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

const APP_Update =  mongoose.model('app_update' , App_updateSchema)
export default APP_Update