import mongoose from "mongoose";
import Carinfo from "../../model/CarInfo_rc.js"
import ResponseMassage from "../../Response/All_Response.js"

const create_RC_Report = async(req,res)=>{
    try {
        const today = new Date(req.body.date)
        today.setUTCHours(0, 0, 0, 0)
        var phpid = await Carinfo.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const Data = {
            php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
            date:today,
            rto_to_carinfo_success:req.body.rto_to_carinfo_success,
            rto_to_carinfo_fail:req.body.rto_to_carinfo_fail,
            type:req.body.type,
            carinfo_to_rto_success:req.body.carinfo_to_rto_success,
            carinfo_to_rto_fail:req.body.carinfo_to_rto_fail
        }
        const Result = Carinfo(Data)
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

const Get_create_carinfo_rc = async(req,res)=>{
    try {
        const Find = await Carinfo.find()

        Find.map((val)=>{

        })
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found" , Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const search_carinfo_rc = async(req,res)=>{
    try {
        let query = [];
        if(req.body.live && req.body.live!==""){
            const datArr = req.body.live.split(" - ")
            let startDate = new Date(datArr[0])
            startDate.setTime(startDate.getTime()+ 5.5*60*60*1000)
            let endDate = new Date(datArr[1])
            endDate.setTime(endDate.getTime()+ 5.5*60*60*1000)
            query.push({date:{$gte:startDate,$lte:endDate}})
          }
          const data = await Carinfo.find(query.length === 0 ? {} : { $and: query})
          res.send(data)
      
    } catch (error) {
        console.log(error)
    }
}
export default {create_RC_Report , Get_create_carinfo_rc,search_carinfo_rc}