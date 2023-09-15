import mongoose from "mongoose";
import Response from "../../Response/All_Response.js"
import Role from "../../model/Role.js"
import Permission from "../../model/Permission.js"
import RolePermission from "../../model/RolePermission.js"

const GetRole = async(req,res)=>{
    try{
        const Find = await Role.find({deleted_at:null}).collation({ locale: "en" }).sort({name:1})
        if(Find !=0){
            res.send(await Response.ResponseSuccess(Find))
        }else{
            res.send(await Response.ResponseErrorDataMsg("Data Not Found", Find))
        }
    }catch(err){
        console.log(err)
    }
}

const GetPermission = async(req,res)=>{
    try{
        // const PermissionData = await Permission.find({deleted_at:null})
        const PermissionData = await Permission.aggregate([
            {
                $lookup:{
                    from:"modules",
                    localField:"module_id",
                    foreignField:"_id",
                    as:"module_id"
                    
                }
            },
            {
                $unwind:"$module_id"
            }
        ])

        const resData = PermissionData.map((val)=>{
            const permission = val.permission===1?"View":val.permission===2?"Cretae":val.permission===3?"Edit":"Delete"
            let obj = {
                _id:val._id,
                name:val.module_id.name +" " + permission
            }
            return obj
        })
        res.send(await Response.ResponseSuccess(resData))
    }catch(err){
        console.log(err)
    }
}

const AddRole = async(req,res)=>{
    try{
        const rolePermission = JSON.parse(req.body.permission)
        const addData = Role({
            name:req.body.name,
            permission_id:rolePermission
        })
        const saveData = await addData.save()
        if(saveData){
            Promise.all(
                rolePermission.map(async(val)=>{
                    const addRolePermission = RolePermission({
                        role_id:saveData._id,
                        permission_id:val
                    })
                    const saveRolePermission = await addRolePermission.save()
                })
            ).then(async()=>{
                res.send(await Response.ResponseSuccess("Role created succesfully",saveData))
            })
        }
    }catch(err){
        console.log(err)
    }
}

const ViewRole = async(req,res)=>{
    try{console.log('req.params.id', req.params.id)
        // const RoleData = await Role.findOne({$and:[{_id:req.params.id},{deleted_at:null}]})
        const roleData = await Role.aggregate([
            {
                $match:{_id:new mongoose.Types.ObjectId(req.params.id),deleted_at:null}
            },
            {
                $lookup:{
                    from:"permissions",
                    localField:"permission_id",
                    foreignField:"_id",
                    pipeline:[
                        {
                            $lookup:{
                                from:'modules',
                                localField:'module_id',
                                foreignField:'_id',
                                as:'module'
                            }
                        },
                        {
                            $unwind:'$module'
                        }
                    ],
                    as:"permission"
                }
            },
            {
                $project:{name:1,permission_id:1,permission:1}
            }
        ])
        if(roleData[0]){
            let resObj = {
                _id:roleData[0]._id,
                name:roleData[0].name,
                permissionId:roleData[0].permission_id
            }
            let PermissionArr = []
            roleData[0].permission.map((val)=>{
                const permission = val.permission===1?"View":val.permission===2?"Cretae":val.permission===3?"Edit":"Delete"
                const permissionName = val.module.name + " " + permission
                PermissionArr.push(permissionName)
            })
            resObj.PermissionArr = PermissionArr
            if(roleData !=0){
                res.send(await Response.ResponseSuccess(resObj))
            }else{
                res.send(await Response.ResponseErrorDataMsg("Data Not Found", resObj))
            }
        }else{
            res.send(await Response.ResponseErrorDataMsg("Data Not Found"))
        }
    }catch(err){
        console.log(err)
    }
}

const EditRole = async(req,res)=>{
    try{
        const findData = await Role.findOne({$and:[{_id:req.params.id},{deleted_at:null}]})
        if(findData){
            const deleteOldData = await RolePermission.deleteMany({$and:[{role_id:findData._id}]})
            const rolePermission = JSON.parse(req.body.permission)
            const data = {
                name:req.body.name,
                permission_id:rolePermission
            }
            const updateData = await Role.findOneAndUpdate({$and:[{_id:req.params.id},{deleted_at:null}]},data,{new:true})
            if(updateData){
                Promise.all(
                    rolePermission.map(async(val)=>{
                        const addRolePermission = RolePermission({
                            role_id:updateData._id,
                            permission_id:val
                        })
                        const saveRolePermission = await addRolePermission.save()
                    })
                ).then(async()=>{
                    res.send(await Response.ResponseSuccess("Role Updated succesfully",updateData))
                })
            }
        }else{
            res.send(await Response.ResponseErrorDataMsg("Data Not Found"))
        }
    }catch(err){
        console.log(err)
    }
}

const DeleteRole = async(req,res)=>{
    try{
        const findData = await Role.findOneAndUpdate({$and:[{_id:req.body.id},{deleted_at:null}]},{deleted_at:new Date()},{new:true})
        if(findData){
            const deleteOldData = await RolePermission.updateMany({role_id:findData._id},{deleted_at:new Date()},{new:true})
            res.send(await Response.ResponseSuccess("Data Deleted Successfully"))
        }else{
            res.send(await Response.ResponseErrorDataMsg("Data Not Found"))
        }
    }catch(err){
        console.log(err);
    }
}

export  default {GetPermission , GetRole , AddRole , ViewRole , EditRole ,DeleteRole}