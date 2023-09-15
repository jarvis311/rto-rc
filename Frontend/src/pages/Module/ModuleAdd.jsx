import React, { useState , useEffect } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { API } from "../../App";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ModuleAdd = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    name:"",
    path:"",
}])

  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.name == undefined || Data.path == undefined ){
      setvalidated(true)
    }else{
      const Form = new FormData()
      Form.append('name' , Data.name)
      Form.append('path' , Data.path)
      const Result = await API.post(`/api/modulePermission/create_ModuleController` , Form , {headers: { Authorization: `Bearer ${token}` }})
      if (Result) {
        toast.success("Data Saved successfully");
        navigate(`/module`)
  }
    }
  }
  return (
    <>
     <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Create Module</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item>
            <Link to="/home">
              <i className="bx bx-home-alt me-2 fs-5"></i> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/module">Module List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create Module</Breadcrumb.Item>
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
                    <Form.Label htmlFor="name">Module</Form.Label>
                    <Form.Control type="text" className="my-2" name="name" onChange={SaveData}  required/>
                    <Form.Control.Feedback type="invalid">
                      Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={4}>
                    <Form.Label htmlFor="name">Route</Form.Label>
                    <Form.Control type="text" className="my-2" name="path" onChange={SaveData} required/>
                    <Form.Control.Feedback type="invalid">
                      Route Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="primary" className="me-3" onClick={Submite} >
                  Save
                </Button>
                <Link to="/module">
                  <Button variant="secondary">Cancle</Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        </Form>
      </div>
    </Layout>
    </>
  )
}

export default ModuleAdd