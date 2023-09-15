import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DarkMode from "../Component/DarkMode";
import { Button, Dropdown } from 'react-bootstrap';
import LogoMini from '../Component/Logo-mini';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { API, AuthContext } from '../App';

const Header = ({ openSidebar }) => {
    const { permission,setPermission } = useContext(AuthContext)
    const navigate = useNavigate()
    const logoutFunc = async () => {
        const token = Cookies.get('fmljwt')
        if (token) {
            const response = await API.post("/api/user/user_logout", {}, { headers: { "Authorization": `Bearer ${token}` } })
            toast('Logout Succesfully')
            Cookies.remove('fmljwt')
            navigate("/")
        } else {
            navigate("/")
        }
    }
    return (
        <>
            <header className="sidebar-header">
                <div className="header-left-menu">
                    <Link to="/" className='d-xl-none'>
                        <LogoMini />
                    </Link>
                </div>
                <div className="header-right-menu">
                    <DarkMode />
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-autoclose-true">
                            <div className="user-menu">
                                <div className="user-img">
                                    <img src="/../logo/rto.png" />
                                </div>
                                <div className="user-name ms-2">
                                    <h6>RTO Information</h6>
                                    <p>{permission['name']}</p>
                                </div>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                            <Dropdown.Item onClick={logoutFunc}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button className="burger-btn d-xl-none" onClick={openSidebar}>
                        <i className='bx bx-menu fs-3'></i>
                    </Button>
                </div>
            </header>
        </>
    )
}

export default Header