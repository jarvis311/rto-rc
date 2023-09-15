import mongoose from "mongoose";
import user_registarationModal from "../../model/user_registration.js";
import ResponseMassage from "../../Response/All_Response.js"

const create_User_registration = async(req,res)=>{
try {
    var phpid = await user_registarationModal.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
    const Data = {
        php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
        name:req.body.name,
        email:req.body.email,
        device_id:req.body.device_id,
        //fcm_token:
        //google_token:
        //account_id:123
        //apple_token:
        //player_id:
        //vehicle_number:
        //language_key:
        //is_subscribed:
        //sku:
        //purchase_time:
        //expiry_date:
        //is_free_trial:
        //is_purchased:
        //no_of_days:
        //status:
        //delete_at:
        mobile_number:req.body.mobile_number,
        vahan_token:req.body.vahan_token
    }

    const result = user_registarationModal(Data)
    const Save = await result.save()
    if(result){
        res.send(await ResponseMassage.ResponseSuccessMsg(Save)) 
    }else{
        res.send(await ResponseMassage.ResponseSuccessMsg("Data Not save")) 
    }
} catch (error) {
    console.log(error)
}
}

export default {create_User_registration}