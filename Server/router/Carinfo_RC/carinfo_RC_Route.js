import express from 'express'
const router = express.Router()
import CarInfo from '../../controller/CarInfo_Rc_Count/carinfo_rc_Controller.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/create_carinfo_rc" , Authentication.Authentication, CarInfo.create_RC_Report)
router.post("/Get_create_carinfo_rc" , Authentication.Authentication, CarInfo.Get_create_carinfo_rc)
router.post("/search_carinfo_rc" , Authentication.Authentication, CarInfo.search_carinfo_rc)
// router.post("/Get_searching_state_count" , Authentication.Authentication, Datas.Get_searching_state_count)

export default router