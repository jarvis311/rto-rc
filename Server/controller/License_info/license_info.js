import mongoose from "mongoose";
import ResponseMassage from "../../Response/All_Response.js"
import License_information from "../../model/license_Information.js"
const create_license_info = async(req,res)=>{
    try {
        var phpid = await License_information.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const Data = {
            php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
            license_no:req.body.license_no,
            dob:req.body.dob,
            name:req.body.name,
            current_status:req.body.current_status,
            date_of_issue:req.body.date_of_issue,
            last_transaction_at:req.body.last_transaction_at,
            old_new_dl_no:req.old_new_dl_no,
            from_non_transport:req.body.from_non_transport,
            to_non_transport:req.body.to_non_transport,
            from_transport:req.body.from_non_transport,
            to_transport:req.body.to_transport,
            hazardous_valid_till:req.body.hazardous_valid_till,
            hill_vaild_till:req.body.hill_vaild_till,
            cov_category:req.body.cov_category,
            class_of_vehicle:req.body.class_of_vehicle,
            cov_issue_date:req.body.cov_category,
            blood_group:req.body.blood_group,
            gender:req.body.gender,
            citizen:req.body.citizen
        }

        const Result = License_information(Data)
        const Save = await Result.save()
        if(Result){
            res.send(await ResponseMassage.ResponseSuccessMsg(Save)) 
        }else{
            res.send(await ResponseMassage.ResponseSuccessMsg("Data Not save")) 
        }
    } catch (error) {
    console.log(error)        
    }
}


const Get_license_info = async(req,res)=>{
    try {
        const Find = await License_information.find()
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}

const Get_license_info_ID = async(req,res)=>{
    try {
        const Find = await License_information.find({_id:req.body.id})
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}

const searching_license_info = async(req,res)=>{
    try {
        var query = []
        if(req.body.search && req.body.search !==""){
            query.push(req.body.search ? { license_no: { $regex: ".*" + req.body.search + ".*", $options: "i" } } : {});
        }
        const Find = await License_information.find(query.length == 0 ? {} : {$and : query})
        if (Find.length !== 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}
export default {create_license_info , Get_license_info , Get_license_info_ID ,searching_license_info}