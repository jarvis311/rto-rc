import express from 'express'
const router = express.Router()
import Qoutes from '../../controller/qoutescConroller/quotescontroller.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/get/qoutes" , Authentication.Authentication, Qoutes.Get_qoutes)
router.post("/add/qoutes" , Authentication.Authentication, Qoutes.create_qoutes)
router.post("/toggle/status" , Authentication.Authentication, Qoutes.toggle_status)
router.post("/serach/quotes" , Authentication.Authentication, Qoutes.serach_quotes)


export default router