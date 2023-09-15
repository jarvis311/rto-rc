import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'rsuite/dist/rsuite.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.css';
import 'bootstrap-daterangepicker/daterangepicker.css'
import './App.css';
import './utilities.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import PrivetRoutes from './Component/PrivetRoutes';
import Protected from './Component/Protected'
import axios from 'axios';
import { env } from './env'
import { createContext, useState } from 'react';
import Permission from './Component/Permission';


import App_update from './pages/APP_Update/App_update';
import Add_App_update from './pages/APP_Update/Add_App_update';
import View_App_update from './pages/APP_Update/View_App_update';
import Edit_App_update from './pages/APP_Update/Edit_App_update';

import Proxy from './pages/Proxy/Proxy';
import Api_status from './pages/API_Priority/Api_status';
import Add_Api_statuses from './pages/API_Priority/Add_Api_statuses';
import View_Api_statuses from './pages/API_Priority/View_Api_statuses';
import Edit_Api_statuses from './pages/API_Priority/Edit_Api_statuses';
import Rc_details from './pages/RC_Details/Rc_details';
import RC_count from './pages/RC_count/RC_count';
import Rc_block from './pages/RC_Block/Rc_block';
import License_Information from './pages/license_Information/License_Information';
import Qoutes from './pages/Qoutes/Qoutes';
import Add_qoutes from './pages/Qoutes/Add_qoutes';
import CraInfo from './pages/Car info/CarInfo';
import Fail_data from './pages/FailData/Fail_data';
import Reminder from './pages/Reminder/Reminder';
import Feedback from './pages/Feedback/Feedback';
import Notification_Report from './pages/Notification_report/Notification_Report';
import Module from "./pages/Module/Module"
import AddModule from "./pages/Module/ModuleAdd"
import ViewModule from "./pages/Module/ModuleView"
import EditModule from "./pages/Module/ModuleEdit"

import Role from './pages/Role/Role';
import AddRole from './pages/Role/RoleAdd';
import ViewRole from './pages/Role/RoleView';
import EditRole from './pages/Role/RoleEdit';

import User from './pages/Permission/User';
import AddUser from './pages/Permission/UserAdd';
import ViewUser from './pages/Permission/UserView';
import EditUser from './pages/Permission/UserEdit';

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })
export const AuthContext = createContext()


const App = () => {
    const [permission, setPermission] = useState({
        "rc_details": [],
        "rc_count": [],
        "rc_block": [],
        "license_Information": [],
        "qoutes": [],
        "CarInfo": [],
        "fail_data": [],
        "rc_reminder": [],
        "rc_feedback": [],
        "notification_report": [],
        "app_update": [],
        "proxy": [],
        "API_Priority": [],
        "type": '',
        "name": '',
    })
    const NotPermissionFunc = ({ redirectPath = "/" }) => {
        return <Navigate to={redirectPath} replace />
    }

    return (
        <>
            <AuthContext.Provider value={{ permission, setPermission }}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Protected/>}>
                            <Route path="/" element={<Login />} />
                        </Route>
                        <Route element={<PrivetRoutes/>}>
                            <Route path="/Home" element={<Home />} />

                            <Route element={<Permission name="rc_details" num={1} />}>
                                <Route path="/rc_details" element={<Rc_details />} />
                            </Route>

                            <Route element={<Permission name="rc_count" num={1} />}>
                                <Route path="/rc_count" element={<RC_count />} />
                            </Route>

                            <Route element={<Permission name="rc_block" num={1} />}>
                                <Route path="/rc_block" element={<Rc_block />} />
                            </Route>

                            <Route element={<Permission name="license_Information" num={1} />}>
                                <Route path="/license_Information" element={<License_Information />} />
                            </Route>

                            <Route element={<Permission name="qoutes" num={1} />}>
                                <Route path="/qoutes" element={<Qoutes />} />
                                <Route path="/Add/qoutes" element={<Add_qoutes />} />
                            </Route>

                            <Route element={<Permission name="CarInfo" num={1} />}>
                                <Route path="/carinfo" element={<CraInfo />} />
                            </Route>

                            <Route element={<Permission name="fail_data" num={1} />}>
                                <Route path="/fail_data" element={<Fail_data />} />
                            </Route>

                            <Route element={<Permission name="rc_reminder" num={1} />}>
                                <Route path="/rc_reminder" element={<Reminder />} />
                            </Route>

                            <Route element={<Permission name="rc_feedback" num={1} />}>
                                <Route path="/rc_feedback" element={<Feedback />} />
                            </Route>

                            <Route element={<Permission name="notification_report" num={1} />}>
                                <Route path="/notification_report" element={<Notification_Report />} />
                            </Route>

                            <Route element={<Permission name="app_update" num={1} />}>
                                <Route path="/app_update" element={<App_update />} />
                                <Route path="/view/app_update/:id" element={<View_App_update />} />
                                <Route path="/Add/app_update" element={<Add_App_update />} />
                                <Route path="/Edit/app_update/:id" element={<Edit_App_update />} />
                            </Route>

                            <Route element={<Permission name="proxy" num={1} />}>
                                <Route path="/proxy" element={<Proxy />} />
                            </Route>

                            <Route element={<Permission name="API_Priority" num={1} />}>
                                <Route path="/API_Priority" element={<Api_status />} />
                                <Route path="/Add/API_Priority" element={<Add_Api_statuses />} />
                                <Route path="/view/API_Priority/:id" element={<View_Api_statuses />} />
                                <Route path="/Edit/API_Priority/:id" element={<Edit_Api_statuses />} />
                            </Route>

                            <Route element={<Permission name="Permission" num={1} />}>
                                <Route path="/module" element={<Module />} />
                                <Route path="/Add/module" element={<AddModule />} />
                                <Route path="/view/module/:id" element={<ViewModule />} />
                                <Route path="/Edit/module/:id" element={<EditModule />} />
                                <Route path="/Role" element={<Role />} />
                                <Route path="/Add/Role" element={<AddRole />} />
                                <Route path="/view/Role/:id" element={<ViewRole />} />
                                <Route path="/Edit/Role/:id" element={<EditRole />} />
                                <Route path="/User" element={<User />} />
                                <Route path="/Add/User" element={<AddUser />} />
                                <Route path="/view/User/:id" element={<ViewUser />} />
                                <Route path="/Edit/User/:id" element={<EditUser />} />
                            </Route>
                        </Route>

                        <Route element={<NotPermissionFunc />}>
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer position='bottom-right' autoClose={500} />
            </AuthContext.Provider>
        </>
    )
}

export default App;
