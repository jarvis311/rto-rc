import mongoose from "mongoose";
import ResponseMassage from "../../Response/All_Response.js"
import ProxyModal from "../../model/ProxyModal.js"


const Get_toggle = async (req, res) => {
    try {
        const Find = await ProxyModal.find()
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}
const All_toggle_change = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "android") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { android: req.body.android }, { new: true });
        }
        if (name == "ios") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { ios: req.body.ios }, { new: true });
        }
        if (name == "android_token") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { android_token: req.body.android_token }, { new: true });
        }
        if (name == "android_app_version") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { android_app_version: req.body.android_app_version }, { new: true });
        }
        if (name == "android_package_name") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { android_package_name: req.body.android_package_name }, { new: true });
        }
        if (name == "ios_token") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { ios_token: req.body.ios_token }, { new: true });
        }
        if (name == "ios_app_version") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { ios_app_version: req.body.ios_app_version }, { new: true });
        }
        if (name == "ios_package_name") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { ios_package_name: req.body.ios_package_name }, { new: true });
        }
        if (name == "parivahan_api") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { parivahan_api: req.body.parivahan_api }, { new: true });
        }
        if (name == "redirect_website") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { redirect_website: req.body.redirect_website }, { new: true });
        }
        if (name == "otp_verify_android") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { otp_verify_android: req.body.otp_verify_android }, { new: true });
        }
        if (name == "hard_otp_verify_android") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { hard_otp_verify_android: req.body.hard_otp_verify_android }, { new: true });
        }
        if (name == "otp_verify_ios") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { otp_verify_ios: req.body.otp_verify_ios }, { new: true });
        }
        if (name == "hard_otp_verify_ios") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { hard_otp_verify_ios: req.body.hard_otp_verify_ios }, { new: true });
        }
        if (name == "parivahan_dl") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { parivahan_dl: req.body.parivahan_dl }, { new: true });
        }
        if (name == "cuvora_parivahan") {
            data = await ProxyModal.findByIdAndUpdate({ _id: req.body.id }, { cuvora_parivahan: req.body.cuvora_parivahan }, { new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}



export default { Get_toggle, All_toggle_change }