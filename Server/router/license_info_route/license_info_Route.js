import express from 'express'
const router = express.Router()
import Authentication from '../../Authentication/Authentication.js'
import License_information from "../../controller/License_info/license_info.js"


router.post("/create_license_info", Authentication.Authentication,License_information.create_license_info)
router.post("/Get_license_info", Authentication.Authentication,License_information.Get_license_info)
router.post("/Get_license_info_ID", Authentication.Authentication,License_information.Get_license_info_ID)
router.post("/searching_license_info", Authentication.Authentication,License_information.searching_license_info)



export default router