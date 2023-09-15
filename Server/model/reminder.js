import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
        },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_registrations"
    },
    reg_number:{
        type:String
    },
    reminder_type:{
        type:String
    },
    doc_type:{
        type:Number
    },
},{timestamps:true})

const ReminderModal = mongoose.model("rc_reminders" , ReminderSchema)
export default ReminderModal