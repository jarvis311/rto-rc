// import React, { useContext, useState } from 'react';
// import { Link, NavLink } from 'react-router-dom'
// import Logo from '../Component/Logo';
// import LogoMini from '../Component/Logo-mini';
// import { AuthContext } from '../App';

// const Sidebar = ({ sidebar }) => {

//     const [classActive, setClassActive] = useState({
//         drp1: false,
//         drp2: false,
//         drp3: false,

//     });

//     const handleActiveClass = (name) => {
//         let data = {
//             drp1: false,
//             drp2: false,
//             drp3: false,

//         }
//         data[name] = classActive[name] === true ? false : true
//         setClassActive(data)
//     };
//     const path = window.location.pathname
//     const { permission, setPermission } = useContext(AuthContext)
//     return (
//         <>
//             <div className={sidebar ? "sidebar-wrapper active" : "sidebar-wrapper"}>
//                 <div className="sidebar-header">
//                     <div className="d-flex justify-content-between">
//                         <div className='sidebar-logo'>
//                             <Link to="/Home">
//                                 <Logo />
//                                 <LogoMini />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="sidebar-menu">
//                     <ul className="menu">
//                         <li className="sidebar-item">
//                             <NavLink to="/Home" className='sidebar-link'>
//                                 <i className='bx bxs-home'></i>
//                                 <span>Dashboard</span>
//                             </NavLink>
//                         </li>
//                         <li className="sidebar-item has-sub">
//                             <div onClick={() => { handleActiveClass("drp1") }} className="sidebar-link">
//                                 <i class='bx bxs-credit-card'></i>
//                                 <span>RC Information</span>
//                             </div>
//                             <ul className={`${"submenu"} ${classActive.drp1 ? "active" : "inactive"}`} >
//                                 {
//                                     permission["Rc Details"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/rc_details">
//                                                 <span>RC Details</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["Rc Count"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/rc_count">
//                                                 <span>RC Count</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["Car info"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/carinfo">
//                                                 <span>Carinfo RC Count</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["RC_Block"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/rc_block">
//                                                 <span>RC Block</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["license_Information"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/license_Information">
//                                                 <span>License Info.</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["FailData"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/fail_data">
//                                                 <span>Fail Data</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["Reminder"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/rc_reminder">
//                                                 <span>Reminder</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["Feedback"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/rc_feedback">
//                                                 <span>Feedback New</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["Notification_report"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/notification_report">
//                                                 <span>Notification Report</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                             </ul>
//                         </li>
//                         <li className="sidebar-item has-sub">
//                             <div onClick={() => { handleActiveClass("drp2") }} className="sidebar-link">
//                                 <i class='bx bxs-check-circle'></i>
//                                 <span>API</span>
//                             </div>
//                             <ul className={`${"submenu"} ${classActive.drp2 ? "active" : "inactive"}`} >
//                                 {
//                                     permission["APP_Update"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/app_update">
//                                                 <span>App Update</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["Proxy"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/proxy">
//                                                 <span>Authorization</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                                 {
//                                     permission["API_Priority"].includes(1) === true?
//                                         <li className="submenu-item">
//                                             <NavLink to="/API_Priority">
//                                                 <span>API Priority</span>
//                                             </NavLink>
//                                         </li> : ""
//                                 }
//                             </ul>
//                         </li>
//                         {
//                             permission["Qoutes"].includes(1) === true ?
//                                 <li className="sidebar-item">
//                                     <NavLink to="/qoutes" className='sidebar-link'>
//                                         <i class='bx bxs-quote-alt-left'></i>
//                                         <span>Quotes</span>
//                                     </NavLink>
//                                 </li> : ""
//                         }

//                         {permission["type"] === 1 ?
//                             <li className="sidebar-item has-sub">
//                                 <div onClick={() => { handleActiveClass("drp3") }} className="sidebar-link">
//                                     <i class='bx bxs-lock-open-alt'></i>
//                                     <span>User Permission</span>
//                                 </div>
//                                 <ul className={`${"submenu"} ${classActive.drp3 ? "active" : "inactive"}`} >

//                                     <li className="submenu-item">
//                                         <NavLink to="/module">
//                                             <span>Module</span>
//                                         </NavLink>
//                                     </li>
//                                     <li className="submenu-item">
//                                         <NavLink to="/Role">
//                                             <span>Role</span>
//                                         </NavLink>
//                                     </li>
//                                     <li className="submenu-item">
//                                         <NavLink to="/User">
//                                             <span>Permission</span>
//                                         </NavLink>
//                                     </li>
//                                 </ul>
//                             </li> : ""
//                         }
//                     </ul>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Sidebar

import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import Logo from '../Component/Logo';
import LogoMini from '../Component/Logo-mini';
import { AuthContext } from '../App';

const Sidebar = ({ sidebar }) => {

    const [classActive, setClassActive] = useState({
        drp1: false,
        drp2: false,
        drp3: false,

    });

    const handleActiveClass = (name) => {
        let data = {
            drp1: false,
            drp2: false,
            drp3: false,

        }
        data[name] = classActive[name] === true ? false : true
        setClassActive(data)
    };
    const { permission, setPermission } = useContext(AuthContext)
    console.log('permission', permission)
    return (
        <>
            <div className={sidebar ? "sidebar-wrapper active" : "sidebar-wrapper"}>
                <div className="sidebar-header">
                    <div className="d-flex justify-content-between">
                        <div className='sidebar-logo'>
                            <Link to="/Home">
                                <Logo />
                                <LogoMini />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-item">
                            <NavLink to="/Home" className='sidebar-link'>
                                <i className='bx bxs-home'></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        {
                            permission["rc_details"].includes(1) || permission["rc_count"].includes(1) || permission["CarInfo"].includes(1) ||
                                permission["rc_block"].includes(1) || permission["license_Information"].includes(1) || permission["fail_data"].includes(1) ||
                                permission["rc_reminder"].includes(1) || permission["rc_feedback"].includes(1) || permission["notification_report"].includes(1) ?

                                <li className="sidebar-item has-sub">
                                    <div onClick={() => { handleActiveClass("drp1") }} className="sidebar-link">
                                        <i class='bx bxs-credit-card'></i>
                                        <span>RC Information</span>
                                    </div>
                                    <ul className={`${"submenu"} ${classActive.drp1 ? "active" : "inactive"}`} >
                                        {
                                            permission["rc_details"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/rc_details">
                                                        <span>RC Details</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["rc_count"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/rc_count">
                                                        <span>RC Count</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["CarInfo"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/carinfo">
                                                        <span>Carinfo RC Count</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["rc_block"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/rc_block">
                                                        <span>RC Block</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["license_Information"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/license_Information">
                                                        <span>License Info.</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["fail_data"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/fail_data">
                                                        <span>Fail Data</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["rc_reminder"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/rc_reminder">
                                                        <span>Reminder</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["rc_feedback"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/rc_feedback">
                                                        <span>Feedback New</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["notification_report"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/notification_report">
                                                        <span>Notification Report</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                    </ul>
                                </li>
                                : ""
                        }

                        {
                            permission["app_update"].includes(1) || permission["proxy"].includes(1) || permission["API_Priority"].includes(1) ?
                                <li className="sidebar-item has-sub">
                                    <div onClick={() => { handleActiveClass("drp2") }} className="sidebar-link">
                                        <i class='bx bxs-check-circle'></i>
                                        <span>API</span>
                                    </div>
                                    <ul className={`${"submenu"} ${classActive.drp2 ? "active" : "inactive"}`} >
                                        {
                                            permission["app_update"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/app_update">
                                                        <span>App Update</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["proxy"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/proxy">
                                                        <span>Authorization</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                        {
                                            permission["API_Priority"].includes(1) ?
                                                <li className="submenu-item">
                                                    <NavLink to="/API_Priority">
                                                        <span>API Priority</span>
                                                    </NavLink>
                                                </li> : ""
                                        }
                                    </ul>
                                </li>
                                : ""
                        }
                        {
                            permission["qoutes"].includes(1) ?
                                <li className="sidebar-item">
                                    <NavLink to="/qoutes" className='sidebar-link'>
                                        <i class='bx bxs-quote-alt-left'></i>
                                        <span>Quotes</span>
                                    </NavLink>
                                </li> : ""
                        }
                        {
                            permission["type"] == 1 ?
                                <li className="sidebar-item has-sub">
                                    <div onClick={() => { handleActiveClass("drp3") }} className="sidebar-link">
                                        <i class='bx bxs-lock-open-alt'></i>
                                        <span>User Permission</span>
                                    </div>
                                    <ul className={`${"submenu"} ${classActive.drp3 ? "active" : "inactive"}`} >

                                        <li className="submenu-item">
                                            <NavLink to="/module">
                                                <span>Module</span>
                                            </NavLink>
                                        </li>
                                        <li className="submenu-item">
                                            <NavLink to="/Role">
                                                <span>Role</span>
                                            </NavLink>
                                        </li>
                                        <li className="submenu-item">
                                            <NavLink to="/User">
                                                <span>Permission</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li> : ""
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar