import express from 'express'
const router = express.Router()
import user from '../../controller/User/user.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/user_register" , user.user_register)
router.post("/user_Update" , user.User_update)
router.post("/protective_route",Authentication.Authentication,user.Protect_route)
router.post("/checkPermission",Authentication.Authentication,user.checkPermission)
router.post("/user_login" , user.login)
router.post("/user_logout" ,Authentication.Authentication, user.logout)
router.post("/protect_route" ,Authentication.Authentication, user.Protect_route)


export default router