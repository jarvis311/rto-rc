import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Proxy = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([{
        _id:"",
        android: 0,
        ios: 0,
        android_token: 0,
        android_app_version: 0,
        android_package_name: 0,
        ios_token: 0,
        ios_app_version: 0,
        ios_package_name: 0,
        parivahan_api: 0,
        redirect_website: 0,
        otp_verify_android: 0,
        hard_otp_verify_android: 0,
        otp_verify_ios: 0,
        hard_otp_verify_ios: 0,
        parivahan_dl: 0,
        cuvora_parivahan: 0,
    }])

    const GetView = async () => {
        const Find = await API.post('/api/proxy/get_toggle', {}, { headers: { Authorization: `Bearer ${token}` } })
        setData({
            _id: Find.data.Data[0]._id,
            android: Find.data.Data[0].android,
            android_token: Find.data.Data[0].android_token,
            android_app_version: Find.data.Data[0].android_app_version,
            android_package_name: Find.data.Data[0].android_package_name,
            ios: Find.data.Data[0].ios,
            ios_token: Find.data.Data[0].ios_token,
            ios_app_version: Find.data.Data[0].ios_app_version,
            ios_package_name: Find.data.Data[0].ios_package_name,
            parivahan_api: Find.data.Data[0].parivahan_api,
            redirect_website: Find.data.Data[0].redirect_website,
            otp_verify_android: Find.data.Data[0].otp_verify_android,
            hard_otp_verify_android: Find.data.Data[0].hard_otp_verify_android,
            otp_verify_ios: Find.data.Data[0].otp_verify_ios,
            hard_otp_verify_ios: Find.data.Data[0].hard_otp_verify_ios,
            parivahan_dl: Find.data.Data[0].parivahan_dl,
            cuvora_parivahan: Find.data.Data[0].cuvora_parivahan
        })
    }

    useEffect(() => {
        GetView()
    }, [])

    const ToggleChange = async(e , name)=>{
        var android
        var ios
        var android_token
        var android_app_version
        var android_package_name
        var ios_token
        var ios_app_version
        var ios_package_name
        var parivahan_api
        var redirect_website
        var otp_verify_android
        var hard_otp_verify_android
        var otp_verify_ios
        var hard_otp_verify_ios
        var parivahan_dl
        var cuvora_parivahan
  
      if (name === "android") {
          android = e === true ? 1 : 0;
          setData({
            _id:Data._id,
            android:android,
            android_token: Data.android_token,
            android_app_version: Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version: Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "ios") {
          ios = e === true ? 1 : 0;
          setData({
            _id:Data._id,
            android:Data.android,
            android_token: Data.android_token,
            android_app_version: Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: ios,
            ios_token: Data.ios_token,
            ios_app_version: Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "android_token") {
        android_token = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token: android_token,
            android_app_version: Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version: Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "android_app_version") {
        android_app_version = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version: Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "android_package_name") {
        android_package_name = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version: Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "ios_token") {
        ios_token = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: ios_token,
            ios_app_version: Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "ios_app_version") {
        ios_app_version = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version: ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "ios_package_name") {
        ios_package_name = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "parivahan_api") {
        parivahan_api = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "redirect_website") {
        redirect_website = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api:  Data.parivahan_api,
            redirect_website:redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "otp_verify_android") {
        otp_verify_android = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "hard_otp_verify_android") {
        hard_otp_verify_android = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "otp_verify_ios") {
        otp_verify_ios = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: otp_verify_ios,
            hard_otp_verify_ios: Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "hard_otp_verify_ios") {
        hard_otp_verify_ios = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios: hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "parivahan_dl") {
        parivahan_dl = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios:Data.hard_otp_verify_ios,
            parivahan_dl: parivahan_dl,
            cuvora_parivahan: Data.cuvora_parivahan
        })
      }
      if (name === "cuvora_parivahan") {
        cuvora_parivahan = e === true ? 1 : 0;
        setData({
            _id:Data._id,
            android:Data.android,
            android_token:Data.android_token,
            android_app_version:Data.android_app_version,
            android_package_name: Data.android_package_name,
            ios: Data.ios,
            ios_token: Data.ios_token,
            ios_app_version:Data.ios_app_version,
            ios_package_name: Data.ios_package_name,
            parivahan_api: Data.parivahan_api,
            redirect_website: Data.redirect_website,
            otp_verify_android: Data.otp_verify_android,
            hard_otp_verify_android: Data.hard_otp_verify_android,
            otp_verify_ios: Data.otp_verify_ios,
            hard_otp_verify_ios:Data.hard_otp_verify_ios,
            parivahan_dl: Data.parivahan_dl,
            cuvora_parivahan: cuvora_parivahan
        })
      }
      const Form = new FormData();
      Form.append("name", name);
      Form.append("id", Data._id);
      if(name == "android"){
          Form.append("android", android);
      }
      if(name == "ios"){
        Form.append("ios", ios);
    }
    if(name == "android_token"){
        Form.append("android_token", android_token);
    }
    if(name == "android_app_version"){
        Form.append("android_app_version", android_app_version);
    }
    if(name == "android_package_name"){
        Form.append("android_package_name", android_package_name);
    }
    if(name == "ios_token"){
        Form.append("ios_token", ios_token);
    }

    if(name == "ios_app_version"){
        Form.append("ios_app_version", ios_app_version);
    }
    if(name == "ios_package_name"){
        Form.append("ios_package_name", ios_package_name);
    }
    if(name == "parivahan_api"){
        Form.append("parivahan_api", parivahan_api);
    }
    if(name == "redirect_website"){
        Form.append("redirect_website", redirect_website);
    }
    if(name == "otp_verify_android"){
        Form.append("otp_verify_android", otp_verify_android);
    }
    if(name == "hard_otp_verify_android"){
        Form.append("hard_otp_verify_android", hard_otp_verify_android);
    }
    if(name == "otp_verify_ios"){
        Form.append("otp_verify_ios", otp_verify_ios);
    }
    if(name == "hard_otp_verify_ios"){
        Form.append("hard_otp_verify_ios", hard_otp_verify_ios);
    }
    if(name == "parivahan_dl"){
        Form.append("parivahan_dl", parivahan_dl);
    }
    if(name == "cuvora_parivahan"){
        Form.append("cuvora_parivahan", cuvora_parivahan);
    } 
      const result = await API.post("/api/proxy/toggle_update", Form, { headers: { Authorization: `Bearer ${token}` } });
      if (result) {
          toast.success(" status Update successfully");
          GetView();
      }
    }


    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Authorization</h3>
            </div>

            <div className="page-content">
                <Form noValidate >
                    <Row>
                        <Col xs={12}>
                            <Card className="mb-4">
                                <Card.Header  className="border border-bottom-1">
                                    <h3>Android</h3>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Android
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "android")}
                                                name="android"
                                                checked={Data.android === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Android Token
                                            </Form.Label>
                                            <Switch
                                               onChange={(e)=> ToggleChange(e , "android_token")}
                                                name="android_token"
                                                checked={Data.android_token === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Android App Version
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "android_app_version")}
                                                name="android_app_version"
                                                checked={Data.android_app_version === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Android Package Name
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "android_package_name")}
                                                name="android_package_name"
                                                checked={Data.android_package_name === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                OTP verify Android
                                            </Form.Label>
                                            <Switch
                                               onChange={(e)=> ToggleChange(e , "otp_verify_android")}
                                                name="otp_verify_android"
                                                checked={Data.otp_verify_android === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Hard OTP verify Android
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "hard_otp_verify_android")}
                                                name="hard_otp_verify_android"
                                                checked={Data.hard_otp_verify_android === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* IOS */}

                            <Card className="mb-4">
                            <Card.Header  className="border border-bottom-1">
                                    <h3>iOS</h3>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                iOS
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "ios")}
                                                name="ios"
                                                checked={Data.ios === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                iOS Token
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "ios_token")}
                                                name="ios_token"
                                                checked={Data.ios_token === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                iOS App Version
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "ios_app_version")}
                                                name="ios_app_version"
                                                checked={Data.ios_app_version === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                iOS Package Name
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "ios_package_name")}
                                                name="ios_package_name"
                                                checked={Data.ios_package_name === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                OTP verify IOS
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "otp_verify_ios")}
                                                name="otp_verify_ios"
                                                checked={Data.otp_verify_ios === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Hard OTP verify IOS
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "hard_otp_verify_ios")}
                                                name="hard_otp_verify_ios"
                                                checked={Data.hard_otp_verify_ios === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Parivahan */}
                            <Card className="mb-4">
                            <Card.Header  className="border border-bottom-1">
                                    <h3>Parivahan API Status</h3>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Parivahan API
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "parivahan_api")}
                                                name="parivahan_api"
                                                checked={Data.parivahan_api === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Website Redirect
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "redirect_website")}
                                                name="redirect_website"
                                                checked={Data.redirect_website === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Cuvora Parivahan
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "cuvora_parivahan")}
                                                name="cuvora_parivahan"
                                                checked={Data.cuvora_parivahan === 1? true:false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Parivahan DL
                                            </Form.Label>
                                            <Switch
                                                onChange={(e)=> ToggleChange(e , "parivahan_dl")}
                                                name="parivahan_dl"
                                                checked={Data.parivahan_dl === 1 ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className="react-switch-off">Close</div>
                                                }
                                                checkedIcon={<div className="react-switch-on">Open</div>}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Layout>
    )
}

export default Proxy