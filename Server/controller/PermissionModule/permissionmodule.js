import mongoose from "mongoose";
import  Module  from "../../model/webModule.js";
import  Permission  from "../../model/Permission.js";
import ResponseMassage from "../../Response/All_Response.js"

const GetModule = async(req,res)=>{
    try{
        const Find = await Module.find({deleted_at:null})
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    }catch(err){
        console.log(err)
    }
}

 const AddModule = async(req,res)=>{
    try{
        const addData = {
            name:req.body.name,
            route:req.body.path
        }
        const Result = Module(addData)
        const saveData = await Result.save()
        if(saveData){
            Promise.all(
                [1,2,3,4].map(async(val)=>{
                    const addPermission = Permission({
                        module_id:saveData._id,
                        permission:val
                    })
                    const savePermission = await addPermission.save()
                   
                })
            ).then(async()=>{
                res.send(await ResponseMassage.ResponseSuccessMsg(saveData)) 
            })
        }
    }catch(err){
        res.json(helper.catchError(err.message))
    }
}

const ViewModule = async(req,res)=>{
    try{
        const Find = await Module.findOne({$and:[{_id:req.params.id},{deleted_at:null}]})
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    }catch(err){
        res.json(helper.catchError(err.message))
    }
}

const EditModule = async(req,res)=>{
    try{
        const data = {
            name:req.body.name,
            route:req.body.path
        }
        const updateData = await Module.findOneAndUpdate({$and:[{_id:req.params.id},{deleted_at:null}]},data,{new:true})
        if(updateData){
           res.send(await ResponseMassage.ResponseSuccess("Update Data"))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("id Not Found"))
        }
    }catch(err){
        res.json(helper.catchError(err.message))
    }
}

const DeleteModule = async(req,res)=>{
    try{
        const delModule = await Module.findOneAndUpdate({$and:[{_id:req.body.id},{deleted_at:null}]},{deleted_at:new Date()},{new:true})
        if(delModule){
            const delPermission = await Permission.updateMany({$and:[{module_id:delModule._id},{deleted_at:null}]},{deleted_at:new Date()},{new:true})
          res.send(await ResponseMassage.ResponseSuccess("Module Deleted.."))
        }else{
            res.send(await ResponseMassage.ResponseErrorMsg("Data Not Found"))
        }
    }catch(err){
        res.json(helper.catchError(err.message))
    }
}

export default {GetModule , AddModule , ViewModule ,EditModule, DeleteModule}