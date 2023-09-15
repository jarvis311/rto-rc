
import router from "express"
import UserRoute  from "./User/user_Route.js"
import App_update_Route  from "./App_update_route/App_update_Route.js"
import proxyRout  from "./ProxyRoute/proxyroute.js"
import API_status  from "./API_status/Api_statuses.js"
import RC_count  from "./Rc_count/RC_count.js"
import RC_block  from "./RC_BLOCK/rc_blockRoute.js"
import License_info  from "./license_info_route/license_info_Route.js"
import Qoutes  from "./qoutes/qoutesRoute.js"
import carinfo  from "./Carinfo_RC/carinfo_RC_Route.js"
import fail_data  from "./Fail_data_Route/fail_data_route.js"
import Reminder  from "./ReminderRoute/reminderRoute.js"
import feedback  from "./feedbackRoute/feedbackroute.js"
import notification_report  from "./Notification_report_Route/notification_report_route.js"
import User_Registration from "./User_registration/user_registrationRoute.js"
import dashboard from "./Dashboard/dashboard_Route.js"
import ModulePermission from "./ModuleRoute/moduleRoute.js"
import RolePermission from "./RoleRoute/RoleRoute.js"
import Appuser from "./AppuserRoute/Appuser.js"
const route = router.Router()

route.use('/user' , UserRoute)
route.use('/app_update' ,App_update_Route)
route.use('/proxy' ,proxyRout)
route.use('/api_status' ,API_status)
route.use('/rc_count' , RC_count)
route.use('/rc_block' , RC_block)
route.use('/license_info' , License_info)
route.use('/qoutes' , Qoutes)
route.use('/car_info' , carinfo)
route.use('/fail_data' , fail_data)
route.use('/rc_reminder' , Reminder)
route.use('/feedback' , feedback)
route.use('/notification_report' , notification_report)
route.use('/user_registration' , User_Registration)
route.use('/dashboard' , dashboard)
route.use('/modulePermission' , ModulePermission)
route.use('/rolePermission' , RolePermission)
route.use('/appuser' , Appuser)


export default route