import mongoose from "mongoose";
import Feedback from "../../model/feedbackmodal.js"
import Feedback_Image from "../../model/feedback_image.js"
import ResponseMassage from "../../Response/All_Response.js"

const create_feedback = async (req, res) => {
    try {
        var phpid = await Feedback.findOne({}).select({ php_id: 1 }).sort({ _id: -1 })
        const Result = await Feedback.create(
            {
                php_id: (phpid?.php_id) ? phpid.php_id + 1 : 1,
                review: req.body.review,
                retings: req.body.retings,
                version_code: req.body.version_code,
                version_name: req.body.version_name,
                contact_information: req.body.contact_information,
                status: req.body.status
            }
        ).then((response) => {
            if (req.files) {
                let ModalColor_url
                let Image_Data = req.files.image
                if (Image_Data.length == undefined) {
                    Image_Data = [req.files.image]
                }
                Image_Data.map(async (val, ind) => {
                    const file = val
                    const ext = file?.name?.split(".")
                    const fileName = Date.now() + "." + ext[ext.length - 1]
                    ModalColor_url = `${process.env.UploadLink}Upload/${fileName}`
                    val.mv('public/Upload/' + fileName, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    const ImageSave = await Feedback_Image({
                        feedback_id_php_id:response.php_id,
                        feedback_id: response._id,
                        image: ModalColor_url,
                    })
                    await ImageSave.save()
                })
            }
        })

        if (Result) {
            res.send(await ResponseMassage.ResponseSuccessMsg(Result))
        } else {
            res.send(await ResponseMassage.ResponseSuccessMsg("Data Not save"))
        }

    } catch (error) {
        console.log(error)
    }
}

const Get_feedback = async (req, res) => {
    try {
        const Find = await Feedback.aggregate([
            {
                $lookup: {
                    from: "feedback_images",
                    localField: "_id",
                    foreignField: "feedback_id",
                    as: "image"
                }
            },
        ])
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}

const toggle_feedback = async (req, res) => {
    try {
        const name = req.body.name;
        var data;
        if (name == "status") {
            data = await Feedback.findByIdAndUpdate({ _id: req.body.id }, { status: req.body.status }, { new: true });
        }
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const searching_feedback = async (req, res) => {
    try {
        const match = {}
        if (req.body.status && req.body.status !== "") {
            match.status = parseInt(req.body.status)
        }
        if (req.body.version_code && req.body.version_code !== "") {
            match.version_code = { $regex: req.body.version_code, $options: 'i' } 
        }
        const Find = await Feedback.aggregate([
            {
                $match: match
            },
            {
                $lookup: {
                    from: "feedback_images",
                    localField: "_id",
                    foreignField: "feedback_id",
                    as: "image"
                }
            },
        ])
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }

    } catch (error) {
        console.log(error)
    }
}

const version_dropdownData = async(req,res)=>{
    try {
        const Find = await Feedback.find().distinct('version_code')
        if (Find != 0) {
            res.send(await ResponseMassage.ResponseSuccess(Find))
        } else {
            res.send(await ResponseMassage.ResponseErrorDataMsg("Data Not Found", Find))
        }
    } catch (error) {
        console.log(error)
    }
}
export default { create_feedback, Get_feedback, toggle_feedback, searching_feedback , version_dropdownData }