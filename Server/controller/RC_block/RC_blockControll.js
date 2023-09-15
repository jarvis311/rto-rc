import mongoose from "mongoose";
import RC_block from "../../model/RC_blockModal.js"
import ResponseMassage from "../../Response/All_Response.js"


const GetData = async(req,res)=>{
    try {
        const Find = await RC_block.find()
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const AddData = async(req,res)=>{
    try {
        var phpid = await RC_block.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const find = await RC_block.findOne({ reg_no: req.body.reg_no })
        if(find){
            res.send(await ResponseMassage.ResponseErrorDataMsg("all Ready Added")) 
        }
        else{
            const Data = {
                php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
                reg_no:req.body.reg_no,
                status:req.body.status,
            }
            const Result = RC_block(Data)
            const Save = await Result.save()
            if(Result){
                res.send(await ResponseMassage.ResponseSuccessMsg(Save)) 
            }else{
                res.send(await ResponseMassage.ResponseSuccessMsg("Data Not save")) 
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const toggle_Rc_block = async(req,res)=>{
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await RC_block.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const searching_Rc_block = async(req,res)=>{
    try {
        const Find = await RC_block.find({reg_no: { $regex: req.body.search, $options: 'i' } })
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

export default {GetData , AddData , toggle_Rc_block , searching_Rc_block} 