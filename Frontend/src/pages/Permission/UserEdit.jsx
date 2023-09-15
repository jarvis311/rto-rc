import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";
import Cookies from "js-cookie";
import { SelectPicker } from "rsuite";
import $ from "jquery";

const UserEdit = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const navigate = useNavigate();
  const [validated, setvalidated] = useState(false)
  const [platformHook, setplatformHook] = useState([])
  const [AddData, setAddData] = useState({
      name:"",
      email:"",
      password:"",
      role:"",
      _id:"",
  })

  const handleChange = (e)=>{
      setAddData({...AddData,[e.target.name]:e.target.value})
  }

  const platformLinkHendler = async (e) => {
      setAddData({...AddData,['role']:e})
  };

  const getData = async(id)=>{
      const res = await API.post(`/api/appuser/view/user/${id}`,{},{ headers: { Authorization: `Bearer ${token}` } })
          setAddData({
            name: res.data.Data.name,
            email: res.data.Data.email,
            password: res.data.Data.password,
            role: res.data.Data.role_id._id,
          })
  }

  const roleData = async () => {
      const resut = await API.post("/api/rolePermission/get/role", {}, { headers: { Authorization: `Bearer ${token}` } });
          let platform_array = []
          platform_array.push({ label: "Select Role", value: "" })
          resut.data.Data.map((val, index) => {
          platform_array.push({ label: val.name, value: val._id })
          })
          setplatformHook(platform_array)
  };

  const submitData = async()=>{
      if(AddData.name==="" || AddData.email==="" || AddData.password==="" || AddData.role===""){
          setvalidated(true)
      }else{
          setvalidated(false)
          const Form = new FormData()
          Form.append('name',AddData.name.trim())
          Form.append('email',AddData.email.trim())
          Form.append('password',AddData.password.trim())
          Form.append('role',AddData.role)
          const res = await API.post(`/api/appuser/edit/user/${params.id}`,Form,{ headers: { Authorization: `Bearer ${token}` } })
          toast.success("User Updated Successfully")
          navigate(`/View/User/${params.id}`)
      }
  }

  useEffect(()=>{
      getData(params.id)
      roleData()
  },[])

  return (
    <>
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3>Edit Permission</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
          <Breadcrumb.Item>
            <Link to="/home">
              <i className="bx bx-home-alt me-2 fs-5"></i> Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/User">Permission List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Permission</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="page-content">
      <Form noValidate validated={validated}>
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Body>
                <Row>
                   <Col md={3}>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" className="my-2" name="name" value={AddData.name} required onChange={handleChange}/>
                     <Form.Control.Feedback type="invalid">
                     Name Field Is Require
                    </Form.Control.Feedback>
                  </Col>
                  
                  <Col md={3}>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="text" className="my-2" name="email" value={AddData.email} required onChange={handleChange}/>
                     <Form.Control.Feedback type="invalid">
                     Email Field Is Required
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={3}>
                    <Form.Label htmlFor="adslink">Password</Form.Label>
                    <Form.Control type="text" className="my-2" name="password" value={AddData.password} required onChange={handleChange}/>
                     <Form.Control.Feedback type="invalid">
                     Password Field Is Required
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={3}>
                    <Form.Label htmlFor="Role">Role</Form.Label>
                    <SelectPicker
                      cleanable={false}
                      data={platformHook}
                      name="platform"
                      value={AddData.role}
                      className="my-2 rs_UserEdit69"
                      block
                      placeholder="Select platform"
                      onChange={(e) => platformLinkHendler(e)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Role Field Is Required
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="primary" className="me-3" onClick={submitData}>
                  Save
                </Button>
                <Link to={`/View/User/${params.id}`}>
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
export default UserEdit