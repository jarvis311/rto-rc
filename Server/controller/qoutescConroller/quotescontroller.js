import mongoose, { Query } from "mongoose";
import QoutesModal from "../../model/quotes.js"
import ResponseMassage from "../../Response/All_Response.js"

const create_qoutes = async (req, res) => {
    try {
        var phpid = await QoutesModal.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const Data = {
            php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
            en: req.body.en,
            bn: req.body.bn,
            hi: req.body.hi,
            mr: req.body.mr,
            gu: req.body.gu,
            ta: req.body.ta,
            te: req.body.te,
            kn: req.body.kn,
            pa: req.body.pa,
            or: req.body.or,
            ml: req.body.ml,
            status:req.body.status
        }

        const Result = QoutesModal(Data)
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

const Get_qoutes = async(req,res)=>{
    try {
        const Find = await QoutesModal.find()
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const toggle_status = async(req,res)=>{
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await QoutesModal.findByIdAndUpdate({ _id: req.body.id },{ status: req.body.status },{ new: true });
        }
        res.send(data);

    } catch (error) {
        console.log(error)
    }
}

const serach_quotes = async(req,res)=>{
    try {
        const Find = await QoutesModal.find({
            $or: [
                { en: { $regex: req.body.search, $options: 'i' } },
                { hi: { $regex: req.body.search, $options: 'i' } },
              ]
        })
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

export default { create_qoutes , Get_qoutes , toggle_status, serach_quotes }