import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, InputGroup,Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";
import Cookies from "js-cookie";

const RoleAdd = () => {
  const token = Cookies.get("fmljwt");
    const navigate = useNavigate();
    const [validated, setvalidated] = useState(false)
    const [permission,setPermission] = useState([])
    const [inpData,setInpData] = useState({
        name:"",
        permission:[]
    })

    const submitData = async()=>{
      console.log('inpData', inpData.permission)
        if(inpData.name==="" && inpData.permission.length == 0 ){
            setvalidated(true)
        }else{
            setvalidated(false)
            const Form = new FormData()
            Form.append('name',inpData.name)
            Form.append('permission',JSON.stringify(inpData.permission))
            const res = await API.post("/api/rolePermission/add/role",Form,{ headers: { Authorization: `Bearer ${token}` } })
                toast.success("Module Created Successfully")
                navigate("/Role")
        }
    }

    const getData = async()=>{
        const res = await API.post("/api/rolePermission/get/permission",{},{ headers: { Authorization: `Bearer ${token}` } })
            setPermission(res.data.Data)
    }

    const checkFunc = (e)=> {
      let idArr = inpData.permission
      if(e.target.checked===true){
          setvalidated(false)
          idArr.push(e.target.id)
      }else if(e.target.checked===false){
          const ind = idArr.indexOf(e.target.id)
          idArr.splice(ind,1)
      }
      setInpData({...inpData,['permission']:idArr})
  }


    useEffect(()=>{
        getData()
    },[])
    return (
    <>
     <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Create Role</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item>
            <Link to="/home">
              <i className="bx bx-home-alt me-2 fs-5"></i> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Role">Role List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Create Role</Breadcrumb.Item>
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
                    <Form.Label htmlFor="name">Role</Form.Label>
                    <Form.Control type="text" className="my-2" name="name" onChange={(e)=>{setInpData({...inpData,['name']:e.target.value.trim()})}} required/>
                    <Form.Control.Feedback type="invalid">
                      Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row>
                    <Col md={12}>
                         <Form.Label htmlFor="name" className="fw-600 my-2">Permissions</Form.Label>
                    </Col>
                    {
                        permission.map((val,ind)=>{
                          console.log('val', val)
                            return(
                                <Col md={3} key={ind}>
                                    <Form.Check type="checkbox" className="my-2" id={val._id} label={val.name} onChange={checkFunc}  required/>
                                </Col>
                            )
                        })
                    }
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="primary" className="me-3" onClick={submitData}>
                  Save
                </Button>
                <Link to="/Role">
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

export default RoleAdd