import mongoose from "mongoose";

const proxySchema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    android:{
        type:Number,
        default:1
    },
    ios:{
        type:Number,
        default:1
    },
    android_token:{
        type:Number,
        default:1
    },
    android_app_version:{
        type:Number,
        default:1
    },
    android_package_name:{
        type:Number,
        default:1
    },
    ios_token:{
        type:Number,
        default:1
    },
    ios_app_version:{
        type:Number,
        default:1
    },
    ios_package_name:{
        type:Number,
        default:1
    },
    parivahan_api:{
        type:Number,
        default:0
    },
    redirect_website:{
        type:Number,
        default:0
    },
    otp_verify_android:{
        type:Number,
        default:0
    },
    hard_otp_verify_android:{
        type:Number,
        default:0
    },
    otp_verify_ios:{
        type:Number,
        default:0
    },
    hard_otp_verify_ios:{
        type:Number,
        default:0
    },
   parivahan_dl:{
        type:Number,
        default:0
    },
    cuvora_parivahan:{
        type:Number,
        default:0
    }
},{timestamps:true})

const ProxyData = mongoose.model('proxy' , proxySchema)
export default ProxyData