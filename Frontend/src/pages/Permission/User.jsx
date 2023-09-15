import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Layout from "../../layout/Layout";
import Pagination from "rc-pagination";
import { API, AuthContext } from "../../App";
import $ from "jquery";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { SelectPicker } from "rsuite";

var Page_array = []
var statush_array = [];
const User = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate();
  const [size, setSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(true)
  const [query, setquery] = useState({
    name: "",
    role: "",
  });
  const [textColor, setTextColor] = useState("name_up");
  const [PageHook,setPageHook] = useState([])

  const getData = async () => {
    const result = await API.post("/api/appuser/get/user", {}, { headers: { Authorization: `Bearer ${token}` } })
    console.log('result', result)
    setData(result.data.Data)
    PageGetData()
    setloading(false)
  }

const [role,setRole] = useState([])
const getRole = async()=>{
  const result = await API.post("/api/rolePermission/get/role",{},{ headers: { Authorization: `Bearer ${token}` } })
    statush_array = []
    statush_array.push({ label: "Select Role", value: "" })
    result.data.Data.map((val, index) => {
      statush_array.push({ label: val.name, value: val._id })
    })
    setRole(statush_array)
}

const wetData = (current, pageSize) => {
    return Data.slice((current - 1) * pageSize, current * pageSize);
};

const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(Data.length / value);
    if (current > newPerPage) {
    setCurrent(newPerPage);
    }
};

const paginationData = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
};

const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
    return <button className="paggination-btn">Previous</button>;
    }
    if (type === "next") {
    return <button className="paggination-btn">Next</button>;
    }
    return originalElement;
};

let count = 10
  let swalCountdownInterval
  const DeleteData = async (id) => {
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
          $(".swal2-confirm").attr('disabled', true);
          swalCountdownInterval = setInterval(function () {
            count--
            if (count < 1) {
              $(".counter").text(`OK`)
              $(".swal2-confirm").attr('disabled', false);
              clearInterval(swalCountdownInterval)
            } else {
              $(".counter").text(`OK (${count})`)
            }
          }, 1000);
        }
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const form = new FormData()
          form.append('id', id)
          await API.post(`/api/appuser/delete/user`, form, { headers: { Authorization: `Bearer ${token}` } });
          getData();
        } else {
          count = 10
          clearInterval(swalCountdownInterval)
        }
      });
  };

const PageGetData = async () => {
    var PageNumber = [10, 25, 50 ,100]
    Page_array = []
    PageNumber.map((val, index) => {
        Page_array.push({ label: val, value: val })
    })
    setPageHook(Page_array)
};


useEffect(() => {
    getData();
    getRole()
    PageGetData()
}, []);


    return (
    <>
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">Permission</h3>
        <div className="page-heading-right">
          <SelectPicker
            cleanable={false}
            data={PageHook}
            searchable={false} 
            defaultValue={10}
            className="wv-100 my-1 ms-3 rs_UserPage67"
            onChange={(e) => {setSize(Number(e));setCurrent(1);}}
          />
        <Link to="/Add/User" className="my-1 ms-3">
            <Button variant="primary" value="create">
            Add New
            </Button>
        </Link>
        </div>
      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
              <Table bordered responsive>
                  <thead>
                    <tr>
                      <th width="5%" className="text-center">No</th>
                      <th width="40%">
                        <div className="table-sort-filter">
                          Name
                        </div>
                      </th>
                      <th width="30%">Email</th>
                      <th width="15%" className="text-center">
                        <div className="table-sort-filter">
                        Role
                        </div>
                      </th>
                      <th width="10%" className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        wetData(current, size).map((val, i) => {
                            return (
                                <tr key={i}>
                                  <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                  <td>{val.name}</td>
                                  <td>{val.email}</td>
                                  <td>{val.role_id?.name}</td>
                                  <td className="text-center">
                                      <Link to={`/View/User/${val._id}`}>
                                      <Button variant="outline-warning" size="sm" className="me-2 btn-icon">
                                          <i className="bx bx-show"></i>
                                      </Button>
                                      </Link>
                                      <Button variant="outline-danger" size="sm" className="btn-icon" onClick={() => DeleteData(val._id)} >
                                          <i className="bx bx-trash-alt"></i>
                                      </Button>
                                  </td>
                                </tr>
                            );
                        })
                    }
                  </tbody>
                </Table>
                {Data.length > size ? (
                  <div className="pagination-custom">
                    <Pagination
                      showTitle={false}
                      className="pagination-data"
                      onChange={paginationData}
                      total={Data.length}
                      showTotal={(total, range) =>
                        `${range[0]} - ${range[1]} of ${total} items`
                      }
                      current={current}
                      pageSize={size}
                      showSizeChanger={false}
                      itemRender={PrevNextArrow}
                      onShowSizeChange={PerPageChange}
                      showQuickJumper
                    />
                  </div>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
    </>
  )
}


export default User