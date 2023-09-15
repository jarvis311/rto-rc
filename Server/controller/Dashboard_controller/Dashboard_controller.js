import mongoose from "mongoose";
import ResponseMassage from "../../Response/All_Response.js"
import License_Information from "../../model/license_Information.js";
import User from "../../model/user_registration.js"
const Dashboard_get = async(req,res)=>{
    try {
        console.log('req.body', req.body)
        const collectionNames = ['AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CG', 'DD', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KL', 'LA', 
                                 'LD', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OD', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB'];
        try { 
            let data
            Promise.all(
                collectionNames.map(async(modal)=>{
                    const Model = mongoose.models[modal] ||
                    mongoose.model(modal, new mongoose.Schema({}));
                    data = (await Model.find()).length; 
                    return  {modal : modal , count :  data}
                })
            ).then(async(resData)=>{
                const RC_detail = resData.reduce((total, val) => total + val.count, 0)
                const Rc_count =  resData.reduce((total, val) => total + val.count, 0)
                const Linces_data =  (await License_Information.find()).length
                const UserData =  (await User.find()).length
                const Data = {
                    RC_detail : RC_detail,
                    RC_count : Rc_count,
                    License_Information:Linces_data,
                    User:UserData
                }
                res.json({
                    status:200,
                    response:Data,
                })
                // res.send(await ResponseMassage.ResponseSuccess(Data))

                return
                const totalCount = resData.length
                if(resData !=0){
                    res.send(await ResponseMassage.ResponseSuccess(totalCount))
                }else{
                    res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", totalCount))
                }
            })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

export default {Dashboard_get}