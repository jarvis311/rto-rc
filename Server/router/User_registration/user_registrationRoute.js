import express from 'express'
const router = express.Router()
import user_registration from '../../controller/user_registration/user_registrationcontroller.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/create_user_register" ,Authentication.Authentication, user_registration.create_User_registration)


export default router