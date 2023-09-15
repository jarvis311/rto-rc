import express from 'express'
const router = express.Router()
import Authentication from '../../Authentication/Authentication.js'
import Notification_report from "../../controller/Notification_report/notification_report_controller.js"


router.post("/create_notification_report", Authentication.Authentication,Notification_report.create_notifiction_report)
router.post("/Get_notifiction_report", Authentication.Authentication,Notification_report.Get__notifiction_report)
router.post("/searching_notification", Authentication.Authentication,Notification_report.Searching_notification)



export default router