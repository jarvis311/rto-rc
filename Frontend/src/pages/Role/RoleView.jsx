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

var reloadId = [];
const RoleView = () => {
  const token = Cookies.get("fmljwt");
  const params = useParams();
  const navigate = useNavigate()
    const [id, setid] = useState({
    _id: params.id,
  });
  const [role,setRole] = useState({
    name:"",
    permissionId:[],
    permissionArr:[],
    _id:""
  })
  const [data,setData] = useState([])
  const getData = async(id)=>{
    const result = await API.post(`/api/rolePermission/view/role/${id}`,{},{ headers: { Authorization: `Bearer ${token}` } })
        setRole({
            name:result.data.Data.name,
            permissionId:result.data.Data.permissionId,
            permissionArr:result.data.Data.PermissionArr,
            _id:result.data.Data._id
        })
  }

  const moduleList = async(req,res)=>{
    reloadId = []
    const result = await API.post("/api/rolePermission/get/role",{},{ headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
        result.data.Data.map((val)=>{
            reloadId.push(val._id)
        })
  }

  useEffect(() => {
    getData(id._id)
    moduleList()
  }, []);

  const editFunc = () => {
    sessionStorage.setItem('path',`/Role/Edit/${role._id}`)
    navigate(`/Edit/Role/${role._id}`)
  }

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
            const ind = reloadId.indexOf(role._id)
            reloadId.splice(ind,1)
            const formdata = new FormData()
            formdata.append("id" , role._id)
           const result =  await API.post("/api/rolePermission/delete/role", formdata , {headers: { Authorization: `Bearer ${token}` }});
            if(reloadId.length === 0){
              window.location.replace(`http://localhost:3000/Role`)
              // window.location.replace(`${process.env.REACT_APP_BASE_URL}Role`)
            }else{
              window.location.replace(`http://localhost:3000/view/Role/${reloadId[0]}`)
              // window.location.replace(`${process.env.REACT_APP_BASE_URL}view/Role/${reloadId[0]}`)
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
        <Link to="/Role">
        <i className="bx bxs-left-arrow-alt btn btn-primary btn-icon-lg me-3"></i>
        </Link>
        View Role
      </h3>
      <div className="page-heading-right">
        <SelectPicker
            data={data}
            defaultValue={id._id}
            cleanable={false}
            labelKey="name"
            valueKey="_id"
            placement="bottomEnd"
            className="wv-250 my-1 ms-3 rs_RoleView65"
            placeholder="Select Name"
            menuClassName="menu-custom wv-250"
            onChange={(e) => getData(e)}
            onEnter={()=> {$(".rs_RoleView65").addClass("arrUpDown")}}
            onExit={()=> {$(".rs_RoleView65").removeClass("arrUpDown")}}
        />
          <Button variant="primary ms-3 my-1" value="edit" onClick={editFunc}>
            Edit
          </Button>
          <Button variant="danger ms-3 my-1 btn-icon-lg"><i className="bx bx-trash-alt" onClick={(i) => Deleteproject()}></i></Button>
      </div>
    </div>
    <div className="page-content">
      <Card>
        <Card.Body>
            <Row>
                <Col md={4}>
                <div className="mb-4">
                    <p className="mb-0 fw-bold">Name</p>
                    <span>{role.name}</span>
                </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                <div className="mb-4">
                    <p className="mb-0 fw-bold">Permission</p>
                    <span>{role.permissionArr.toString()}</span>
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

export default RoleView