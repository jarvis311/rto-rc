import mongoose from "mongoose";

const quotesSchema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    en: {
        type: String,
        default: null
    },
    bn: {
        type: String,
        default: null
    },
    hi: {
        type: String,
        default: null
    },
    mr: {
        type: String,
        default: null
    },
    gu: {
        type: String,
        default: null
    },
    ta: {
        type: String,
        default: null
    },
    te: {
        type: String,
        default: null
    },
    kn: {
        type: String,
        default: null
    },
    pa: {
        type: String,
        default: null
    },
    or: {
        type: String,
        default: null
    },
    ml: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 0
    },
    delete_at: {
        type: String,
        default: null
    },
    delete_by: {
        type: Number,
        default: null
    }

}, { timestamps: true })

const QuotesModal = mongoose.model("qoutes", quotesSchema)
export default QuotesModal