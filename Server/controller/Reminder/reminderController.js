import mongoose from "mongoose";
import Reminder from "../../model/reminder.js"
import Responsemasaage from "../../Response/All_Response.js"
const create_reminder = async(req,res)=>{
    try {
        var phpid = await Reminder.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const Data = {
            php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
            user_id:req.body.user_id,
            reg_number:req.body.reg_number,
            reminder_type:req.body.reminder_type.replace(/\s/g, ''),
            doc_type:req.body.doc_type
        }

        const Result = Reminder(Data)
        const Save = await Result.save()
        if(Result){
            res.send(await Responsemasaage.ResponseSuccessMsg(Result)) 
        }else{
            res.send(await Responsemasaage.ResponseSuccessMsg("Data Not save")) 
        }
    } catch (error) {
        console.log(error)
    }
}

const Get_reminder = async(req,res)=>{
    try {
        const Find = await Reminder.find().populate('user_id',{php_id:1,name:1})
        if(Find !=0){
            res.send(await Responsemasaage.ResponseSuccess(Find))
        }else{
            res.send(await Responsemasaage.ResponseErrorDataMsg("Data Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const Search_reminder = async(req,res)=>{
    try {
       let query = []
       if (req.body.reminder_type && req.body.reminder_type !== "") {
        query.push(req.body.reminder_type ? { reminder_type: { $regex: ".*" + req.body.reminder_type + ".*", $options: "i" } } : {});
       }
       if (req.body.state && req.body.state !== "") {
        query.push(req.body.state ? { reg_number: { $regex: ".*" + req.body.state + ".*", $options: "i" } } : {});
       }
       if (req.body.searchvalue && req.body.searchvalue !== "") {
        query.push(req.body.searchvalue ? { reg_number: { $regex: ".*" + req.body.searchvalue + ".*", $options: "i" } } : {});
       }
       if (req.body.doc_type && req.body.doc_type !== "") {
        query.push(req.body.doc_type ? { doc_type: req.body.doc_type } : {});
       }
        const Find = await Reminder.find(query.length === 0 ? {} : { $and: query}).populate('user_id',{php_id:1,name:1})
            if(Find !=0){
                res.send(await Responsemasaage.ResponseSuccess(Find))
            }else{
                res.send(await Responsemasaage.ResponseErrorDataMsg("Data Not Found", Find))
            } 
    } catch (error) {
        console.log(error)
    }
}

export default {create_reminder , Get_reminder , Search_reminder}