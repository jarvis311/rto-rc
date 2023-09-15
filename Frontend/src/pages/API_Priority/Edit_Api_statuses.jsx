import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Form, InputGroup, Image, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from 'react-switch'
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Edit_Api_statuses = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams()
  const [validated, setvalidated] = useState(false)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    third_party_api:"",
    status:"",
}])

const Getview = async (Eid) => {
  const result = await API.post(`/api/api_status/get_api_statuses_ID/${params.id}` , {} , {headers: { Authorization: `Bearer ${token}` }});
  setData({
    third_party_api:result.data.Data[0].third_party_api,
    status:result.data.Data[0].status,
  });
};

  useEffect(() => {
   Getview()
  }, [])
  


  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const StatusUpdate = (e)=>{
      const Result = e === true ? 1 : 0;
      setData({
        third_party_api:Data.third_party_api,
        status: Result,
      });
  }


  const Submite = async()=>{
    if(Data.third_party_api == ""){
      setvalidated(true)
    }else{
      const Result = await API.post(`/api/api_status/update_api_statuses_ID/${params.id}` , Data , {headers: { Authorization: `Bearer ${token}` }})
      if (Result) {
        toast.success("Data Update successfully");
        navigate(`/view/API_Priority/${params.id}`)
  }    
  }
  }

  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>API Priority Edit</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/API_Priority">API Priority</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit API Priority</Breadcrumb.Item>
        </Breadcrumb>
    </div>

    <div className="page-content">
        <Form noValidate validated={validated}>
            <Row>
                <Col xs={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Label htmlFor="icon">Thirdparty API</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="third_party_api"
                                        onChange={SaveData}
                                        value={Data.third_party_api}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Thirdparty API Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={2}>
                                <Form.Label htmlFor="status" className="d-block mb-2">
                                  Status
                                </Form.Label>
                                <Switch
                                  onChange={StatusUpdate}
                                  name="status"
                                  checked={Data.status === 1 ? true : false}
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
                        <Card.Footer className="text-end">
                            <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                            <Link to={`/view/API_Priority/${params.id}`}>
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

export default Edit_Api_statuses