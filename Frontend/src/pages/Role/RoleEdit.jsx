import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, InputGroup,Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";
import Cookies from "js-cookie";

const RoleEdit = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const navigate = useNavigate();
  const [validated, setvalidated] = useState(false)
  const [permission,setPermission] = useState([])
  const [inpData,setInpData] = useState({
      name:"",
      permission:[]
  })

  const submitData = async()=>{
      if(inpData.name==="" || inpData.permission.length===0){
          setvalidated(true)
      }else{
          setvalidated(false)
          const Form = new FormData()
          Form.append('name',inpData.name)
          Form.append('permission',JSON.stringify(inpData.permission))
          const res = await API.post(`/api/rolePermission/edit/role/${params.id}`,Form,{ headers: { Authorization: `Bearer ${token}` } })
              toast.success("Role Updated Successfully")
              navigate(`/View/Role/${params.id}`)
      }
  }

  const getData = async()=>{
      const result = await API.post(`/api/rolePermission/view/role/${params.id}`,{},{ headers: { Authorization: `Bearer ${token}` } })
          setInpData({
              name:result.data.Data.name,
              permission:result.data.Data.permissionId,
          })
    }

  const getPermission = async()=>{
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
      getPermission()
      getData()
  },[])
    return (
    <>
     <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Edit Role</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item>
            <Link to="/home">
              <i className="bx bx-home-alt me-2 fs-5"></i> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Role">Role List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Role</Breadcrumb.Item>
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
                    <Form.Control type="text" className="my-2" name="name" value={inpData.name} onChange={(e)=>{setInpData({...inpData,['name']:e.target.value.trim()})}} required/>
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
                            return(
                                <Col md={3} key={ind}>
                                    <Form.Check type="checkbox" className="my-2" id={val._id} label={val.name} checked={inpData.permission.includes(val._id)?true:false} onChange={checkFunc} required/>
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
                <Link to={`/View/Role/${params.id}`}>
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

export default RoleEdit