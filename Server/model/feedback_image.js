import mongoose from "mongoose";

const feedback_imageSchema = new mongoose.Schema({
    feedback_id_php_id: {
        type: Number,
        default: 0
    },
    feedback_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feedbacks"
    },
    image: {
        type: String
    }
}, { timeseries: true })
const feed_imageModal = mongoose.model('feedback_images', feedback_imageSchema)
export default feed_imageModal