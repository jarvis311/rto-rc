import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Outlet , Navigate, useNavigate } from "react-router-dom";
import { API, AuthContext } from "../App";

const Permission = (props) =>{
    // const { permission,setPermission } = useContext(AuthContext)
    const navigate = useNavigate();
    let Auth = {
        token :Cookies.get("fmljwt")
    }
    const [result,setResult] = useState(null)
    const [loading,setLoading] = useState(true)
    const Authotication = async()=>{
        const Form = new FormData()
        Form.append("name",props.name)
        Form.append("num",props.num)
        const result = await API.post( "/api/user/checkPermission",Form,{ headers: { Authorization: `Bearer ${Auth.token}` } });
        console.log('result=======????>>><<<<', result)
        if(result.data.Response_massage === "Permnission Denied") {
            setResult(false)
            setLoading(false)
        }else{
            setResult(true)
            setLoading(false)
        }
    }
    useEffect(() => {
        Authotication()
    }, [])
    
    if(result===true && loading ===false){
        return <Outlet/>
    }
    if(result===false && loading ===false){
        navigate("/home")
    }
}
export default Permission