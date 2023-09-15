
import mongoose from "mongoose"
import AppUser from "../../model/Appuser.js"
import Cryptr from "cryptr";
const cryptr = new Cryptr("RTO-Service");
import ResponseMassage from "../../Response/All_Response.js"

const GetAppUser = async(req,res)=>{
    try{
        const Find = await AppUser.find({deleted_at:null}).populate("role_id",{name:1}).select({name:1,email:1,role_id:1}).collation({ locale: "en" }).sort({ name: 1 })
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    }catch(err){
        res.json(helper.catchError(err.message))
    }
}

const SearchUser = async(req,res)=>{
    try{
        var query = [];
        if(req.body.name && req.body.name !== ""){
            query.push({ name: { $regex: ".*" + req.body.name + ".*", $options: "i" } });
        }
        if(req.body.role && req.body.role !== ""){
            query.push({ role_id: req.body.role });
        }

        let Find = await AppUser.find(query.length === 0 ? { deleted_at: null } : { $and: query, deleted_at: null }).populate("role_id",{name:1}).select({name:1,email:1,role_id:1}).collation({ locale: "en" }).sort({ name: 1 })
        if(Find !=0){
            res.send(await ResponseMassage.ResponseSuccess(Find))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    }catch(err){
        res.json(helper.catchError(err.message))
    }
}

const AddUser = async(req,res)=>{
    try{
        const password = cryptr.encrypt(req.body.password);
        const addData = AppUser({
            name:req.body.name,
            email:req.body.email,
            password:password,
            role_id:req.body.role
        })
        const saveData = await addData.save()
        if(saveData){
            res.send(await ResponseMassage.ResponseSuccess("User created succesfully",saveData))
        }
    }catch(err){
        console.log(err)
    }
}

const ViewUser = async(req,res)=>{
    try{
        const UserData = await AppUser.findOne({$and:[{_id:req.params.id},{deleted_at:null}]}).populate("role_id",{name:1}).select({deleted_at:0,tokens:0,__v:0})
        if(UserData){
            const password = cryptr.decrypt(UserData.password)
            const resObj = {
                _id:UserData._id,
                name:UserData.name,
                email:UserData.email,
                password:password,
                role_id:UserData.role_id,
            }
            res.send(await ResponseMassage.ResponseSuccess(resObj))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found"))
        }
    }catch(err){
        console.log(err)
    }
}

const EditUser = async(req,res)=>{
    try{
        const password = cryptr.encrypt(req.body.password);
        const data = {
            name:req.body.name,
            email:req.body.email,
            password:password,
            role_id:req.body.role
        }
        const updateData = await AppUser.findOneAndUpdate({$and:[{_id:req.params.id},{deleted_at:null}]},data,{new:true})
        if(updateData){
            res.send(await ResponseMassage.ResponseSuccess("User Updated Successfully",updateData))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found"))
        }
    }catch(err){
        console.log(err)
    }
}

const DeleteUser = async(req,res)=>{
    try{
        const deleteData = await AppUser.findOneAndUpdate({$and:[{_id:req.body.id},{deleted_at:null}]},{deleted_at:new Date()},{new:true})
        if(deleteData){
           res.send(await ResponseMassage.ResponseSuccess("Deleted Data"))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found"))
        }
    }catch(err){
       console.log(err)
    }
}

export default {GetAppUser , SearchUser , AddUser ,ViewUser , EditUser, DeleteUser}