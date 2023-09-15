import mongoose from "mongoose";
import ResponseMassage from "../../Response/All_Response.js"



const Get_state_data = async(req,res)=>{
            try {
                let data
                if(req.body.collectionNames){
                    const Model = mongoose.models[req.body.collectionNames] ||
                    mongoose.model(req.body.collectionNames, new mongoose.Schema({}));
                     data = await Model.find();
                }
                if(req.body.source){
                    const Model = mongoose.models[req.body.collectionNames] ||
                    mongoose.model(req.body.collectionNames, new mongoose.Schema({}));
                     data = await Model.find({source : req.body.source});
                }
                if(req.body.searchvalue){
                    const Model = mongoose.models[req.body.collectionNames] ||
                    mongoose.model(req.body.collectionNames, new mongoose.Schema({}));
                     data = await Model.find(req.body.searchvalue ? { reg_no : { $regex: ".*" + req.body.searchvalue + ".*", $options: "i" } } : {});
                }
                if(data !=0){
                    res.send(await ResponseMassage.ResponseSuccess(data))
                }else{
                    res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", data))
                }
            } catch (error) {
             console.error('Error fetching data===>:', error);
            }
}

const Get_state_data_ID = async(req,res)=>{
    try {
        let data
        if(req.body.id){
            const Model = mongoose.models[req.body.collectionNames] ||
            mongoose.model(req.body.collectionNames, new mongoose.Schema({}));
             data = await Model.find({_id : req.body.id});
        }
        if(data !=0){
            res.send(await ResponseMassage.ResponseSuccess(data))
        }else{
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", data))
        }
    } catch (error) {
     console.error('Error fetching data===>:', error);
    }
}

const Get_state_count = async(req,res)=>{
    const collectionNames = ['AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CG', 'DD', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KL', 'LA', 'LD', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OD', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB'];
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
            if(resData !=0){
                res.send(await ResponseMassage.ResponseSuccess(resData))
            }else{
                res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", resData))
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const Get_searching_state_count = async(req,res)=>{
    try {
        let data
        let Find
        if(req.body.state && req.body.state !==""){
            const Model = mongoose.models[req.body.state] ||
            mongoose.model(req.body.state, new mongoose.Schema({}));
            data = (await Model.find()).length; 
             Find =  [{modal : req.body.state , count :  data}]
        }
            if(Find !=0){
                res.send(await ResponseMassage.ResponseSuccess(Find))
            }else{
                res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", resData))
            }

    } catch (error) {
        console.log(error)
    }
}



export default { Get_state_data , Get_state_data_ID , Get_state_count , Get_searching_state_count}