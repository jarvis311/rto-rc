import mongoose from "mongoose";
import Notification_Report from "../../model/notification_report.js"
import ResponseMassage from "../../Response/All_Response.js"

const create_notifiction_report = async(req,res)=>{
    try {
        var phpid = await Notification_Report.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const Result = Notification_Report.create(
            {
                php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
                type:req.body.type,
                total:req.body.total,
                success:req.body.success,
                fail:req.body.fail,
                date:req.body.date
            }
        )
        if(Result){
            res.send(await ResponseMassage.ResponseSuccessMsg(Result)) 
        }else{
            res.send(await ResponseMassage.ResponseSuccessMsg("Data Not save")) 
        }

    } catch (error) {
        console.log(error)
    }
}

const Get__notifiction_report = async(req,res)=>{
    try {
        const Find = await Notification_Report.find()
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const Searching_notification = async(req,res)=>{
    try {
        const Find = await Notification_Report.find({type : req.body.status})
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}
export default {create_notifiction_report , Get__notifiction_report, Searching_notification}