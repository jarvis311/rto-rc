import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row, Image } from "react-bootstrap";
import Layout from "../../layout/Layout";
import { API } from "../../App";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import $ from "jquery";

var title = []
var reloadId = [];
const UserView = () => {
    const token = Cookies.get("fmljwt");
    const params = useParams();
    const [id, setid] = useState({ _id: params.id });
    const [user, setUser] = useState([]);
    const [Data, SetData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        role_id: "",
        _id: ""
    });

    const getData = async (Eid) => {
        const res = await API.post(`/api/appuser/view/user/${Eid !== "" ? Eid : id._id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        SetData({
            name: res.data.Data.name,
            email: res.data.Data.email,
            password: res.data.Data.password,
            role: res.data.Data.role_id.name,
            role_id: res.data.Data.role_id._id,
            _id: res.data.Data._id
        });
      };

      const selectpickerData = (e) => {
        setid({ _id: e });
        getData(e);
      };
    
      useEffect(() => {
        getUserList()
        getData("")
      }, [])


    const getUserList = async () => {
        const res = await API.post(`/api/appuser/get/user`, {}, { headers: { Authorization: `Bearer ${token}` } })
        title = []
        reloadId = []
        res.data.Data.map((val, index) => {
            title.push({ label: val.name, value: val._id, })
            reloadId.push(val._id)
        })
        setUser(title)
    }


    const myfun = () => {
        toast.success("Copy successfully");
    };

    let count = 10
    let swalCountdownInterval
    const Deleteproject = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-danger btn-lg counter",
            cancelButton: "btn btn-primary btn-lg me-3",
          },
          buttonsStyling: false,
        });
    
        swalWithBootstrapButtons
          .fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this!",
            imageUrl: '../../icon/alert.svg',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: "OK (10)",
            cancelButtonText: "Cancel",
            showCancelButton: true,
            reverseButtons: true,
            didOpen: () => {
              $(".swal2-confirm").attr('disabled',true);
              swalCountdownInterval = setInterval(function(){
                count--
                if( count<1){
                  $(".counter").text(`OK`)
                  $(".swal2-confirm").attr('disabled',false);
                  clearInterval(swalCountdownInterval)
                }else{
                  $(".counter").text(`OK (${count})`)
                }
              }, 1000);
            }
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const ind = reloadId.indexOf(Data._id)
              reloadId.splice(ind,1)
              const formdata = new FormData()
              formdata.append("id" , Data._id)
             const result =  await API.post("/api/appuser/delete/user", formdata , {headers: { Authorization: `Bearer ${token}` }});
              if(reloadId.length === 0){
                window.location.replace(`http://localhost:3000/User`)
                // window.location.replace(`${process.env.REACT_APP_BASE_URL}User`)
              }else{
                window.location.replace(`http://localhost:3000/view/User/${reloadId[0]}`)
                // window.location.replace(`${process.env.REACT_APP_BASE_URL}view/User/${reloadId[0]}`)
              }
            }else{
              count = 10
              clearInterval(swalCountdownInterval)
            }
          });
      };


    return (
        <>
            <Layout sidebar={true}>
                <div className="page-heading">
                    <h3>
                        <Link to="/User">
                            <i className="bx bxs-left-arrow-alt btn btn-primary btn-icon-lg me-3"></i>
                        </Link>
                        View Permission
                    </h3>
                    <div className="page-heading-right">
                    <SelectPicker data={user} defaultValue={id._id} cleanable={false} className="wv-200 my-1 ms-3" onChange={(e) => selectpickerData(e)} placeholder="Select Categories" placement="bottomEnd" />
                        <Link to={`/Edit/User/${id._id}`}>
                            <Button variant="primary ms-3 my-1" value="edit" >
                                Edit
                            </Button>
                        </Link>
                        <Button variant="danger ms-3 my-1 btn-icon-lg" onClick={(i) => Deleteproject()}><i className="bx bx-trash-alt"></i></Button>
                    </div>
                </div>
                <div className="page-content">
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <div className="mb-4">
                                        <p className="mb-0 fw-bold">Name</p>
                                        <span>{Data.name}</span>
                                    </div>
                                </Col>

                                <Col md={4}>
                                    <div className="mb-4">
                                        <p className="mb-0 fw-bold">Email</p>
                                        <span>{Data.email}</span>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="mb-4">
                                        <p className="mb-0 fw-bold">Password</p>
                                        <span>
                                            <CopyToClipboard text={Data.password}>
                                                <Button title={Data.password} variant="outline-success" className="btn-icon me-2" onClick={myfun}><i class='bx bx-copy'></i></Button>
                                            </CopyToClipboard>
                                        </span>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="mb-4">
                                        <p className="mb-0 fw-bold">Role</p>
                                        <span>{Data.role}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Layout>
        </>
    )
}

export default UserView