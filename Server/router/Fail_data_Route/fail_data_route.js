import express from 'express'
const router = express.Router()
import Authentication from '../../Authentication/Authentication.js'
import Fail_data from "../../controller/Fail_Data/fail_datacontrller.js"

router.post("/create_fail_data", Authentication.Authentication,Fail_data.create_fail_data)
router.post("/Get_fail_data", Authentication.Authentication,Fail_data.Get_fail_data)
router.post("/serach_fail_data", Authentication.Authentication,Fail_data.Search_fail_data)




export default router
