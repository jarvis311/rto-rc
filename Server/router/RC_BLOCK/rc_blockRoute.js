import express from 'express'
const router = express.Router()
import rc_blocks from '../../controller/RC_block/RC_blockControll.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/get/rc_block" , Authentication.Authentication, rc_blocks.GetData)
router.post("/add/rc_block" , Authentication.Authentication, rc_blocks.AddData)
router.post("/toggle_Rc_block" , Authentication.Authentication, rc_blocks.toggle_Rc_block)
router.post("/searching_Rc_block" , Authentication.Authentication, rc_blocks.searching_Rc_block)


export default router