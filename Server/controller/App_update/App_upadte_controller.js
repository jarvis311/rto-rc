import ResponseMassage from "../../Response/All_Response.js"
import App_update_Modal from "../../model/App_update.js"

const create_app_update = async(req,res)=>{
    try {
        var phpid = await App_update_Modal.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const data = {
            php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
            title:req.body.title,
            version_code:req.body.version_code,
            current_version:req.body.current_version,
            package_name:req.body.package_name,
            start_io_ads_enable:req.body.start_io_ads_enable,
            affilation_program_enable:req.body.affilation_program_enable,
        }

        const result =  App_update_Modal(data)
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

const get_app_update = async(req,res)=>{
    try {
        const Find = await App_update_Modal.find()
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}

const get_app_update_ID = async(req,res)=>{
    try {
        const Find = await App_update_Modal.find({_id:req.params.id})
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}
const update_app_update = async(req,res)=>{
    try {
        const update = {
            title:req.body.title,
            version_code:req.body.version_code,
            current_version:req.body.current_version,
            package_name:req.body.package_name,
            start_io_ads_enable:req.body.start_io_ads_enable,
            affilation_program_enable:req.body.affilation_program_enable,
        }
        const UpdateData = await App_update_Modal.findByIdAndUpdate({_id:req.params.id} , update , {new:true})
        if(UpdateData){
            res.send(await ResponseMassage.ResponseSuccess(UpdateData))
        }else{
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}
const delete_app_update = async(req,res)=>{
    try {
        const DeleteData = await App_update_Modal.findByIdAndDelete({_id:req.body.id})
        if (DeleteData) {
            res.send(await ResponseMassage.ResponseSuccess(DeleteData))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const toggle_app_update = async(req,res)=>{
    try {
        const name = req.body.name;
        var data;
        if (name == "start_io_ads_enable") {
            data = await App_update_Modal.findByIdAndUpdate({ _id: req.body.id },{ start_io_ads_enable: req.body.start_io_ads_enable },{ new: true });
        }
        if (name == "affilation_program_enable") {
            data = await App_update_Modal.findByIdAndUpdate({ _id: req.body.id },{ affilation_program_enable: req.body.affilation_program_enable },{ new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

export default {create_app_update , get_app_update , get_app_update_ID , update_app_update, delete_app_update , toggle_app_update}