import express from "express"
const router = express.Router()
import Reminder from '../../controller/Reminder/reminderController.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/create_reminder" , Authentication.Authentication, Reminder.create_reminder)
router.post("/Get_reminder" , Authentication.Authentication, Reminder.Get_reminder)
router.post("/Get_searching_reminder" , Authentication.Authentication, Reminder.Search_reminder)

export default router
