import mongoose from "mongoose";

const fail_dataschema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    reg_no: {
        type: String
    },
    fcm_token: {
        type: String,
        default: "NA"
    },
    date: {
        type: Date,
        default: null
    },
    delete_at: {
        type: String,
        default: null
    }
}, { timestamps: true })

const Fail_dataModal = mongoose.model('fail_datas', fail_dataschema)
export default Fail_dataModal