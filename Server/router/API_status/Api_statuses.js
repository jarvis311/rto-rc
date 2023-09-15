import express from 'express'
const router = express.Router()
import Authentication from '../../Authentication/Authentication.js'
import API_STATUSES from "../../controller/api_statuses/api_statuses_controller.js"


router.post("/create_api_statuses", Authentication.Authentication,API_STATUSES.create_api_statuses)
router.post("/get_api_statuses", Authentication.Authentication,API_STATUSES.get_api_statuses)
router.post("/get_api_statuses_ID/:id", Authentication.Authentication,API_STATUSES.get_api_statuses_ID)
router.post("/update_api_statuses_ID/:id", Authentication.Authentication,API_STATUSES.update_api_statuses)
router.post("/delete_api_statuses", Authentication.Authentication,API_STATUSES.delete_api_statuses)
router.post("/toggle_api_statuses", Authentication.Authentication,API_STATUSES.toggle_api_statuses)
router.post("/drag_and_drop_api_statuses", Authentication.Authentication,API_STATUSES.drag_and_drop_api_statuses)


export default router