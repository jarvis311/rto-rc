import express from 'express'
const router = express.Router()
import Proxy from '../../controller/Proxy/Proxy.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/get_toggle" , Authentication.Authentication, Proxy.Get_toggle)
router.post("/toggle_update" , Authentication.Authentication, Proxy.All_toggle_change)

export default router