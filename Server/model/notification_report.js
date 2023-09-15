import mongoose from "mongoose";

const Notification_reportschema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    type: {
        type: String
    },
    total: {
        type: Number,
    },
    success: {
        type: Number
    },
    fail: {
        type: Number
    },
    date: {
        type: Date
    }
})

const Notification_report_modal = mongoose.model('notification_reports', Notification_reportschema)
export default Notification_report_modal