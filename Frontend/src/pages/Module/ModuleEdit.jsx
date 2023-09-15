import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ModuleEdit = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    name:"",
    path:"",
}])

const Getview = async (Eid) => {
    const result = await API.post(`/api/modulePermission/view_ModuleController/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
    console.log('result', result)
    setData({
      name:result.data.Data.name,
      path:result.data.Data.route,
    });
  };

  useEffect(() => {
   Getview()
  }, [])
  


  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.name == "" || Data.path == ""){
      setvalidated(true)
    }else{
      const Result = await API.post(`/api/modulePermission/Edit_ModuleController/${params.id}` , Data , {headers: { Authorization: `Bearer ${token}` }})
      if (Result) {
        toast.success("Data Update successfully");
        navigate(`/View/module/${params.id}`)
  }    
  }
  }

  return (
    <>
     <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Edit Module</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item>
            <Link to="/home">
              <i className="bx bx-home-alt me-2 fs-5"></i> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Module">Module List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Module</Breadcrumb.Item>
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
                    <Form.Control type="text" className="my-2" name="name" value={Data.name} onChange={SaveData} required/>
                    <Form.Control.Feedback type="invalid">
                      Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={4}>
                    <Form.Label htmlFor="name">Route</Form.Label>
                    <Form.Control type="text" className="my-2" name="path" value={Data.path} onChange={SaveData} required/>
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
                <Link to={`/View/module/${params.id}`}>
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

export default ModuleEdit