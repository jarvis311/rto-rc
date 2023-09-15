import mongoose from "mongoose";
import ResponseMassage from "../../Response/All_Response.js"
import helper from "../../helper/helper.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr("RTO-Service");
import user from "../../model/User.js"
import AppUser from "../../model/Appuser.js"
import WebModule from "../../model/webModule.js"
import RolePermission from "../../model/RolePermission.js"
import Permission from "../../model/Permission.js"

const user_register = async (req, res) => {
  try {
    const password = cryptr.encrypt(req.body.password);
    const data = new user({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });
    const result = await data.save();
    res.send(await ResponseMassage.ResponseSuccess("User Create Successfuly"))
    return
  } catch (error) {
    console.log(error)
  }
}
const User_update = async (req, res) => {
  try {
    if (!req.body.id || req.body.id === "") {
      res.send("id requried")
      return
    }
    if (!req.body.email || req.body.email === "") {
      res.send("email requried")
      return
    }
    if (!req.body.password || req.body.password === "") {
      res.send("password requried")
      return
    }
    const find = await user.findOne({ _id: req.body.id })
    if (!find) {
      res.send("Data Not Exits")
      return
    }
    var data = {
      name: req.body.name,
      email: req.body.email,
      password: cryptr.encrypt(req.body.password)
    }
    const result = await user.findByIdAndUpdate({ _id: req.body.id }, data, { new: true })
    res.send(await helper.successResponse("User Update Successfuly"))
  } catch (error) {
    console.log(error.message);
  }
}

const checkPermission = async (req, res) => {
  const name = req.body.name
  const num = parseInt(req.body.num)
  const _id = req.admin._id
  const User = req.admin
  if (name == "Permission") {
    const isPermission = await AppUser.findById({ _id: _id })
    if(!isPermission){
      res.send(await ResponseMassage.ResponseSuccess("Permission Granted"))
    }else{
      res.send(await ResponseMassage.ResponseErrorDataMsg("Permnission Denied"))
    }
  } else {
    const isAdmin = await user.findById({ _id: _id })
    if (isAdmin) {
      res.send(await ResponseMassage.ResponseSuccessMsg(isAdmin))
    } else {
      console.log("123")
      const moduleData = await WebModule.findOne({ $and: [{ name: name }, { deleted_at: null }] })
      const PermissionData = await Permission.findOne({ $and: [{ module_id: moduleData._id }, { permission: num }, { deleted_at: null }] })
      const rolePermission = await RolePermission.findOne({ $and: [{ permission_id: PermissionData._id }, { role_id: User.role_id }, { deleted_at: null }] })
      if (rolePermission) {
        res.send(await ResponseMassage.ResponseSuccessMsg(rolePermission))
      } else {
        res.send(await ResponseMassage.ResponseErrorDataMsg("Permnission Denied"))
      }
    }
  }
}

const login = async (req, res) => {
  if (!req.body.email || req.body.email == "") {
    res.json({
      status: false,
      response_code: 401,
      response_message: "Email Field Is Required",
    });
    return;
  }
  if (!req.body.password || req.body.password == "") {
    res.json({
      status: false,
      response_code: 401,
      response_message: "Password Field Is Required",
    });
    return;
  }
  let data = await user.findOne({email: { $regex: req.body.email, $options: "i" },});
  if (data == null) {
    let data1 = await AppUser.findOne({email: { $regex: req.body.email, $options: "i" }});
    if(data1==null){
      res.json({
        status: false,
        response_code: 401,
        response_message: "Email Id not Match",
      });
      return;
    }else{ 
      if (cryptr.decrypt(data1.password) == req.body.password) {
        let allPermitData = {}
        allPermitData['type'] = 2
        allPermitData['name']= data1.name
        const moduleData = await WebModule.find()
        moduleData.map((data) => {
          allPermitData[data.name] = []
        })
        const permissionData = await RolePermission.find({role_id:data1.role_id})
        Promise.all(
          permissionData.map(async(val)=>{
            const perData = await Permission.findOne({_id:val.permission_id}).populate("module_id")
            let newArr = allPermitData[perData.module_id.name]
            newArr.push(perData.permission)
            allPermitData[perData.module_id.name] = newArr  
          })
        ).then(async()=>{
          const weboken = await data1.gettoken();
          res.json({
            status: true,
            response_code: 200,
            response_message: "User Login Successfully",
            data:{allPermitData, auth: weboken }  
          });
        })
        
        return;  
      }else{
        res.json({
          status: false,
          response_code: 401,
          response_message: "Password Not Match",
        });
        return;  
      }
    }
  } else {
    if (cryptr.decrypt(data.password) === req.body.password) {
      let allPermitData = {}
      allPermitData['type'] = 1
      allPermitData['name'] = "Admin"
      const moduleData = await WebModule.find()
      moduleData.map((data) => {
          allPermitData[data.name] = [1,2,3,4]
      })
      const weboken = await data.gettoken();
      res.json({
        status: true,
        response_code: 200,
        response_message: "User Login Successfully",
        data:{allPermitData, auth: weboken }
      });
      return;
    } else {
      res.json({
        status: false,
        response_code: 401,
        response_message: "Password Not Match",
      });
      return;
    }
  }
}

const logout = async (req, res) => {
  try{
    if(req.admin?.tokens?.length>30){
      req.admin.tokens = []  
    }else{
        req.admin.tokens = req.admin.tokens.filter((curr) => {
          return curr.token !== req.token
        })
        await req.admin.save()
    }
    res.send(await helper.successResponse("User Logout Successfuly"))
  } catch (err) {
    console.log(err)
  }
}

const Protect_route = async (req, res) => {
  try {
    if (req.type == "user") {
      let allPermitData = {}
      allPermitData['type'] = 2
      allPermitData['name'] = req.admin.name
      const moduleData = await WebModule.find()
      moduleData.map((data) => {
        allPermitData[data.name] = []
      })
      const permissionData = await RolePermission.find({ role_id: req.admin.role_id })
      Promise.all(
        permissionData.map(async (val) => {
          const perData = await Permission.findOne({ _id: val.permission_id }).populate("module_id")
          let newArr = allPermitData[perData.module_id.name]
          newArr.push(perData.permission)
          allPermitData[perData.module_id.name] = newArr
        })
      ).then(async () => {
        res.json({
          status: true,
          response_code: 200,
          response_message: "User Verified Successfully",
          data: allPermitData
        });
      })
    } else if (req.type != "user") {
      let allPermitData = {}
      allPermitData['type'] = 1
      allPermitData['name'] = "Admin"
      const moduleData = await WebModule.find()
      moduleData.map((data) => {
        allPermitData[data.name] = [1, 2, 3, 4]
      })
      res.json({
        status: true,
        response_code: 200,
        response_message: "Admin Verified Successfully",
        data: allPermitData
      });
    } else {
      let allPermitData = {}
      const moduleData = await WebModule.find()
      moduleData.map((data) => {
        allPermitData[data.name] = []
      })
      res.json({
        status: true,
        response_code: 200,
        response_message: "User Verification Failed",
        data: allPermitData
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      response_code: 401,
      response_message: "something went wrong",
    });
  }
}
export default { user_register, User_update, Protect_route, checkPermission, login, logout, Protect_route }