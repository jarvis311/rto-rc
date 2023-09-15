import { useContext, useEffect, useState } from "react";
import { Outlet , Navigate, useNavigate } from "react-router-dom";
import { API, AuthContext } from "../App";
import Cookies from "js-cookie";
import Home from "../pages/Home";

const Protected = () =>{
    const { permission,setPermission } = useContext(AuthContext)
    const navigate = useNavigate();
    let Auth = {
        token :Cookies.get("fmljwt")
    }

    const Authotication = async()=>{
        const result = await API.post( "/api/user/protective_route",{},{ headers: { Authorization: `Bearer ${Auth.token}` } });
        console.log('result=====>>>>', result)
        if (result.data.status == false) {
            navigate("/");
        }else{
            setPermission(result.data.data)
        }
    }
    useEffect(() => {
Authotication()
    }, [])
    

    return(
        Auth.token ? <Navigate to={"/home"}/> : <Outlet/>
    )
}
export default Protected