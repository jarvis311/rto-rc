import React, { useState , useEffect } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Add_App_update = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [start_io_ads_enable, setstart_io_ads_enable] = useState(0)
  const [affilation_program_enable, setaffilation_program_enable] = useState(0)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    title:"",
    version_code:"",
    current_version:"",
    package_name:"",
    start_io_ads_enable:"",
    affilation_program_enable:"",
}])

  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.title == undefined || Data.version_code == undefined || Data.current_version == undefined || Data.package_name == undefined ){
      setvalidated(true)
    }else{
      const Form = new FormData()
      Form.append('title' , Data.title)
      Form.append('version_code' , Data.version_code)
      Form.append('current_version' , Data.current_version)
      Form.append('package_name' , Data.package_name)
      Form.append('start_io_ads_enable',start_io_ads_enable)
      Form.append('affilation_program_enable' , affilation_program_enable)
      const Result = await API.post(`/api/app_update/create_app_update` , Form , {headers: { Authorization: `Bearer ${token}` }})
      if (Result) {
        toast.success("Data Saved successfully");
        navigate(`/app_update`)
  }
    }
  }

  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>App Update Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/app_update">App Update</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create App Update</Breadcrumb.Item>
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
                                  onChange={(checked) => { checked === true ?  setstart_io_ads_enable(1): setstart_io_ads_enable(0)}}
                                  name="start_io_ads_enable"
                                  checked={start_io_ads_enable === 1 ? true : false}
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
                                  onChange={(checked) => { checked === true ?  setaffilation_program_enable(1): setaffilation_program_enable(0) }}
                                  name="affilation_program_enable"
                                  checked={affilation_program_enable === 1 ? true : false}
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
                            <Link to='/app_update'>
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

export default Add_App_update