import ResponseMassage from "../../Response/All_Response.js"
import API_statuses from "../../model/api_statuses.js"


const create_api_statuses = async(req,res)=>{
    try {
        var phpid = await API_statuses.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const data = {
            php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
            third_party_api:req.body.third_party_api,
            status:req.body.status
        }

        const Result = API_statuses(data)
        const Save = Result.save()
        if(Save){
            res.send(await ResponseMassage.ResponseSuccessMsg(Save)) 
        }else{
            res.send(await ResponseMassage.ResponseSuccessMsg("Data Not save")) 
        }
    } catch (error) {
        console.log(error)
    }
}

const get_api_statuses = async(req,res)=>{
    try {
        const Find = await API_statuses.find().sort({ position: 1 })
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const get_api_statuses_ID = async(req,res)=>{
    try {
        const Find = await API_statuses.find({_id:req.params.id})
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const update_api_statuses = async(req,res)=>{
    try {
        const update = {
            third_party_api:req.body.third_party_api,
            status:req.body.status
        }
        const UpdateData = await API_statuses.findByIdAndUpdate({_id:req.params.id} , update , {new:true})
        if(UpdateData){
            res.send(await ResponseMassage.ResponseSuccess(UpdateData))
        }else{
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const delete_api_statuses = async (req,res)=>{
    try {
        const DeleteData = await API_statuses.findByIdAndDelete({_id:req.body.id})
        if (DeleteData) {
            res.send(await ResponseMassage.ResponseSuccess(DeleteData))
        } else {
            res.send(await ResponseMassage.ResponseErrorMsg("ID Not Found"))
        }
    } catch (error) {
        console.log(error)
    }
}

const toggle_api_statuses = async(req,res)=>{
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await API_statuses.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        res.send(data); 
    } catch (error) {
        console.log(error)
    }
}

const drag_and_drop_api_statuses = async(req,res)=>{
    try {
        const data = req.body;
        const API_DATA = await API_statuses.find().select({ __v: 0 });
        let dd
        for (let i = 0; i < API_DATA.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (API_DATA[i]._id == data[j].id) {
                    const _id = { _id: data[j].id };
                    const index = { position: data[j].position };
                    dd = await API_statuses.findByIdAndUpdate(_id, index, { new: true });
                }
            }
        }
        res.send(await ResponseMassage.ResponseErrorMsg("Position Updated Successfully"))
        return
    } catch (e) {
        console.log(e.massage)
        return
    }
}
export default {create_api_statuses , get_api_statuses , get_api_statuses_ID , update_api_statuses , delete_api_statuses , toggle_api_statuses , drag_and_drop_api_statuses}