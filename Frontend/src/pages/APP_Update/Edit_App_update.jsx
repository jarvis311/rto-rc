import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Edit_App_update = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    title:"",
    version_code:"",
    current_version:"",
    package_name:"",
    start_io_ads_enable:"",
    affilation_program_enable:"",
}])

const Getview = async (Eid) => {
    const result = await API.post(`/api/app_update/get_app_update_ID/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
    setData({
      title:result.data.Data[0].title,
      version_code:result.data.Data[0].version_code,
      current_version:result.data.Data[0].current_version,
      package_name:result.data.Data[0].package_name,
      start_io_ads_enable:result.data.Data[0].start_io_ads_enable,
      affilation_program_enable:result.data.Data[0].affilation_program_enable,
    });
  };

  useEffect(() => {
   Getview()
  }, [])
  


  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const start_io_ads_enableHendler = (e)=>{
      const Result = e === true ? 1 : 0;
      setData({
        title:Data.title,
        version_code:Data.version_code,
        current_version:Data.current_version,
        package_name:Data.package_name,
        affilation_program_enable:Data.affilation_program_enable,
        start_io_ads_enable: Result,
      });
  }

  const affilation_program_enableHendler = (e)=>{
    const Result = e === true ? 1 : 0;
    setData({
      title:Data.title,
      version_code:Data.version_code,
      current_version:Data.current_version,
      package_name:Data.package_name,
      affilation_program_enable:Result,
      start_io_ads_enable: Data.start_io_ads_enable,
    });
}


  const Submite = async()=>{
    if(Data.title == "" || Data.version_code == "" || Data.current_version == "" || Data.package_name == "" ){
      setvalidated(true)
    }else{
      const Result = await API.post(`/api/app_update/update_app_update_ID/${params.id}` , Data , {headers: { Authorization: `Bearer ${token}` }})
      if (Result) {
        toast.success("Data Update successfully");
        navigate(`/view/app_update/${params.id}`)
  }    
  }
  }

  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>App Update Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/app_update">App Update</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit App Update</Breadcrumb.Item>
        </Breadcrumb>
    </div>

    <div className="page-content">
        <Form noValidate validated={validated}>
            <Row>
                <Col xs={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="icon">title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={Data.title}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    title Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Minimum Version Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="version_code"
                                        value={Data.version_code}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Minimum Version Code Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Current Live Version</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="current_version"
                                        value={Data.current_version}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Current Live Version Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={4}>
                                    <Form.Label htmlFor="icon">Package Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="package_name"
                                        value={Data.package_name}
                                        onChange={SaveData}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Package Name Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={2}>
                                <Form.Label htmlFor="status" className="d-block mb-2">
                                  Featured
                                </Form.Label>
                                <Switch
                                  onChange={start_io_ads_enableHendler}
                                  name="start_io_ads_enable"
                                  checked={Data.start_io_ads_enable === 1 ? true : false}
                                  offColor="#C8C8C8"
                                  onColor="#0093ed"
                                  height={30}
                                  width={70}
                                  className="react-switch"
                                  uncheckedIcon={
                                    <div className="react-switch-off">Disable</div>
                                  }
                                  checkedIcon={<div className="react-switch-on">Enable</div>}
                                />
                              </Col>

                              <Col md={2}>
                                <Form.Label htmlFor="status" className="d-block mb-2">
                                  Featured
                                </Form.Label>
                                <Switch
                                  onChange={affilation_program_enableHendler}
                                  name="affilation_program_enable"
                                  checked={Data.affilation_program_enable === 1 ? true : false}
                                  offColor="#C8C8C8"
                                  onColor="#0093ed"
                                  height={30}
                                  width={70}
                                  className="react-switch"
                                  uncheckedIcon={
                                    <div className="react-switch-off">Disable</div>
                                  }
                                  checkedIcon={<div className="react-switch-on">Enable</div>}
                                />
                              </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                            <Link to={`/view/app_update/${params.id}`}>
                                <Button variant="secondary">Cancle</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Form>
    </div>
</Layout>
  )
}

export default Edit_App_update