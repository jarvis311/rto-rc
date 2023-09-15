import express from 'express'
const router = express.Router()
import Authentication from '../../Authentication/Authentication.js'
import ModuleController from "../../controller/PermissionModule/permissionmodule.js"


router.post("/create_ModuleController", Authentication.Authentication,ModuleController.AddModule)
router.post("/Get_ModuleController", Authentication.Authentication,ModuleController.GetModule)
router.post("/view_ModuleController/:id", Authentication.Authentication,ModuleController.ViewModule)
router.post("/Edit_ModuleController/:id", Authentication.Authentication,ModuleController.EditModule)
router.post("/Delete_ModuleController", Authentication.Authentication,ModuleController.DeleteModule)



export default router