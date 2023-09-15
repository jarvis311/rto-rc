import express from 'express'
const router = express.Router()
import Authentication from '../../Authentication/Authentication.js'
import Dashboard from "../../controller/Dashboard_controller/Dashboard_controller.js"

router.post("/get_dashboard", Authentication.Authentication,Dashboard.Dashboard_get)




export default router
