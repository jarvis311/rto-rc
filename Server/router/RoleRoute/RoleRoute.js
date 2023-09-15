import express from "express"
const router = express.Router()
import RolePermission from '../../controller/PermissionRole/PermissionRolecontroller.js'
import Authentication from '../../Authentication/Authentication.js'

router.post("/get/role",Authentication.Authentication,RolePermission.GetRole)
router.post("/get/permission",Authentication.Authentication,RolePermission.GetPermission)
router.post("/add/role",Authentication.Authentication,RolePermission.AddRole)
router.post("/view/role/:id",Authentication.Authentication,RolePermission.ViewRole)
router.post("/edit/role/:id",Authentication.Authentication,RolePermission.EditRole)
router.post("/delete/role",Authentication.Authentication,RolePermission.DeleteRole)

export default router
