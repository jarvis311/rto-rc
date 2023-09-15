import mongoose from "mongoose"

const license_InformationSchema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
     },
    license_no:{
        type:String
    },
    dob:{
        type:Date
    },
    name:{
        type:String
    },
    current_status:{
        type:String
    },
    date_of_issue:{
        type:Date
    },
    last_transaction_at:{
        type:String
    },
    old_new_dl_no:{
        type:String
    },
    from_non_transport:{
        type:Date
    },
    to_non_transport:{
        type:Date
    },
    from_transport:{
        type:Date,
        default:null
    },
    to_transport:{
        type:Date,
        default:null
    },
    hazardous_valid_till:{
        type:String
    },
    hill_vaild_till:{
        type:String
    },
    cov_category:{
        type:String,
        default:null
    },
    class_of_vehicle:{
        type:String,
        default:null
    },
    cov_issue_date:{
        type:String,
        default:null
    },
    blood_group:{
        type:String
    },
    gender:{
        type:String
    },
    citizen:{
        type:String
    },
    delete_at:{
        type:String
    },

},{timestamps:true})

const license_InformationModal = mongoose.model('license_Informations' , license_InformationSchema)
export default license_InformationModal