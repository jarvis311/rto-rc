import express from 'express'
const router = express.Router()
import Appuser from '../../controller/App_user/App_user.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/get/user",Authentication.Authentication,Appuser.GetAppUser)
router.post("/search/user",Authentication.Authentication,Appuser.SearchUser)
router.post("/add/user",Authentication.Authentication,Appuser.AddUser)
router.post("/view/user/:id",Authentication.Authentication,Appuser.ViewUser)
router.post("/edit/user/:id",Authentication.Authentication,Appuser.EditUser)
router.post("/delete/user",Authentication.Authentication,Appuser.DeleteUser)

export default router