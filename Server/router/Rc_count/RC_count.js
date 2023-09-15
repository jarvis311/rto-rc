import express from 'express'
const router = express.Router()
import Datas from '../../controller/Rc_Count/Rc_count_controller.js'
import Authentication from '../../Authentication/Authentication.js'

// router.post("/creat_data" , Authentication.Authentication, Datas.create_Datas)
router.post("/Get_state_data" , Authentication.Authentication, Datas.Get_state_data)
router.post("/Get_state_data_ID" , Authentication.Authentication, Datas.Get_state_data_ID)
router.post("/Get_state_count" , Authentication.Authentication, Datas.Get_state_count)
router.post("/Get_searching_state_count" , Authentication.Authentication, Datas.Get_searching_state_count)

export default router