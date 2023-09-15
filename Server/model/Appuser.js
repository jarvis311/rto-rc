import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const appUserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    deleted_at:{
        type:String,
        default:null
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})

appUserSchema.methods.gettoken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.SCRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
}
const Appusermodal = mongoose.model("App_User",appUserSchema) 
export default Appusermodal