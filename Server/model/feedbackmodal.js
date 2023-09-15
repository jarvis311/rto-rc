import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
    },
    retings: {
        type: String,
        default: null
    },
    version_code: {
        type: String,
        default: null
    },
    version_name: {
        type: String,
        default: null
    },
    contact_information: {
        type: String,
    },
    status: {
        type: Number,
        default: 1
    },
    delete_at: {
        type: String,
        default: null
    }
}, { timeseries: true })

const feedbackModal = mongoose.model('feedbacks', FeedbackSchema)
export default feedbackModal