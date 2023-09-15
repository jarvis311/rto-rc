import express from 'express'
const router = express.Router()
import Authentication from '../../Authentication/Authentication.js'
import App_Update from "../../controller/App_update/App_upadte_controller.js"


router.post("/create_app_update", Authentication.Authentication,App_Update.create_app_update)
router.post("/get_app_update", Authentication.Authentication,App_Update.get_app_update)
router.post("/get_app_update_ID/:id", Authentication.Authentication,App_Update.get_app_update_ID)
router.post("/update_app_update_ID/:id", Authentication.Authentication,App_Update.update_app_update)
router.post("/delete_app_update", Authentication.Authentication,App_Update.delete_app_update)
router.post("/toggle_app_update", Authentication.Authentication,App_Update.toggle_app_update)


export default router