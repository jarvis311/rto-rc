import mongoose from "mongoose";

const User_registrationSchema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
        },
    name:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    device_id:{
        type:String,
    },
    fcm_token:{
        type:String,
        default:"NA"
    },
    google_token:{
        type:String,
        default:null
    },
    account_id:{
        type:String,
    },
    apple_token:{
        type:String,
        default:null
    },
    player_id:{
        type:String,
        default:null
    },
    vehicle_number:{
        type:String,
        default:null
    },
    language_key:{
        type:String,
        default:"en"
    },
    is_subscribed:{
        type:Number,
        default:0
    },
    sku:{
        type:String,
        default:null
    },
    purchase_time:{
        type:String,
        default:null
    },
    expiry_date:{
        type:String,
        default:null
    },
    is_free_trial:{
        type:Number,
        default:0
    },
    is_purchased:{
        type:Number,
        default:0
    },
    no_of_days:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:0
    },
    delete_at:{
        type:String,
        default:null
    },
    mobile_number:{
        type:String,
    },
    vahan_token:{
        type:String,
    },
})

const user_registarationModal = mongoose.model('user_registrations' , User_registrationSchema)
export default user_registarationModal