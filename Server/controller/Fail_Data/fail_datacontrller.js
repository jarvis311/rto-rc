import mongoose from "mongoose";
import Fail_data from "../../model/fail_data.js"
import Responsemasage from "../../Response/All_Response.js"

const create_fail_data = async(req,res)=>{
    try {
        var phpid = await Fail_data.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
       const Result = await Fail_data.create({
        php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
        reg_no:req.body.reg_no,
        fcm_token:req.body.fcm_token,
        date:req.body.date
       }) 
       if(Result){
        res.send(await Responsemasage.ResponseSuccessMsg("Data Save"))
       }else{
        res.send(await Responsemasage.ResponseErrorMsg("Data Not Found"))
       }
    } catch (error) {
        console.log(error)
    }
}

const Get_fail_data = async(req,res)=>{
    try {
        const Find = await Fail_data.find()
        if(Find !=0){
            res.send(await Responsemasage.ResponseSuccess(Find))
        }else{
            res.send(await Responsemasage.ResponseErrorDataMsg("Data not Found" , Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Search_fail_data = async(req,res) =>{
try {
    const Find = await Fail_data.find({
        $and: [
            { reg_no: { $regex: req.body.state, $options: 'i' } },
            { reg_no: { $regex: req.body.searchvalue, $options: 'i' } },
          ]
    })
        if(Find !=0){
            res.send(await Responsemasage.ResponseSuccess(Find))
        }else{
            res.send(await Responsemasage.ResponseErrorDataMsg("Data Not Found", Find))
        }
} catch (error) {
    console.log(error)
}
}

export default {create_fail_data , Get_fail_data , Search_fail_data}