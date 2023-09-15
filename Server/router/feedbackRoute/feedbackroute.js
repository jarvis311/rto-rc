
import express from 'express'
const router = express.Router()
import Authentication from '../../Authentication/Authentication.js'
import Feedback from "../../controller/Feedback/feedbackcontroller.js"


router.post("/create_feedback", Authentication.Authentication,Feedback.create_feedback)
router.post("/get_feedback", Authentication.Authentication,Feedback.Get_feedback)
router.post("/toggle_feedback", Authentication.Authentication,Feedback.toggle_feedback)
router.post("/searching_feedback", Authentication.Authentication,Feedback.searching_feedback)
router.post("/version_dropdownData", Authentication.Authentication,Feedback.version_dropdownData)




export default router