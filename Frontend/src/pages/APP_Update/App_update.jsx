import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { Button, Form, Card, Col, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import Switch from 'react-switch';
import Fancybox from "../../Component/FancyBox";
import { API, AuthContext } from "../../App";
import { toast } from "react-toastify";
import $ from "jquery";
import Swal from "sweetalert2";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";

var Page_array = [];
const App_update = () => {
  const token = Cookies.get("fmljwt");
  const { permission, setPermission } = useContext(AuthContext)
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [loading, setloading] = useState(true)
  const GetData = async () => {
    const result = await API.post("/api/app_update/get_app_update", {}, { headers: { Authorization: `Bearer ${token}` } })
    setData(result.data.Data)
    PageGetData()
    setloading(false)
  }

  // Paggintion Code //
  const getData1 = (current, pageSize) => {
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

  const PageGetData = async () => {
    var PageNumber = [10, 25, 50, 100]
    Page_array = []
    PageNumber.map((val, index) => {
      Page_array.push({ label: val, value: val })
    })
    setPageHook(Page_array)
  };

  const Togglechange = async (id, e, name) => {
    var start_io_ads_enable;
    var affilation_program_enable;

    if (name === "start_io_ads_enable") {
      start_io_ads_enable = e === true ? 1 : 0;
    }
    if (name === "affilation_program_enable") {
      affilation_program_enable = e === true ? 1 : 0;
    }
    const Form = new FormData();
    Form.append("id", id);
    Form.append("name", name);
    Form.append("start_io_ads_enable", start_io_ads_enable);
    Form.append("affilation_program_enable", affilation_program_enable);
    let result
    if(permission["type"] == 1){
       result = await API.post("/api/app_update/toggle_app_update", Form, { headers: { Authorization: `Bearer ${token}` } });
    }
    if (result) {
      toast.success(" status Update successfully");
      GetData();
    }
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
          await API.post(`/api/app_update/delete_app_update`, form, { headers: { Authorization: `Bearer ${token}` } });
          GetData();
        } else {
          count = 10
          clearInterval(swalCountdownInterval)
        }
      });
  };

  useEffect(() => {
    GetData()
  }, [])
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">App Update</h3>
        <div className="page-heading-right">
          <SelectPicker
            cleanable={false}
            data={PageHook}
            searchable={false}
            // style={{ width: 224 }}
            defaultValue={10}
            className="wv-100 my-1 ms-3"
            onChange={(e) => {
              setSize(Number(e));
              setCurrent(1);
            }}
          />
          {
            permission["type"] == 1 ?
              <Link to="/Add/app_update" className="my-1 ms-3">
                <Button variant="primary" value="create">Add New</Button>
              </Link> : ""
          }

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
                      <th width="10%">Title</th>
                      <th width="15%">Minimum Version Code</th>
                      <th width="10%">Current Live Version</th>
                      <th width="20%">Package Name</th>
                      <th width="10%">Start Io ads Enable</th>
                      <th width="15%">Affiliation Program Enable</th>
                      <th width="15%" className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData1(current, size).map((val, i) => {
                        return (
                          <tr>
                            <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                            <td>{val.title}</td>
                            <td>{val.version_code}</td>
                            <td>{val.current_version}</td>
                            <td>{val.package_name}</td>
                            <td className='text-center'>
                              <Switch
                                onChange={(e) => {
                                  Togglechange(val._id, e, "start_io_ads_enable");
                                }}
                                checked={val.start_io_ads_enable === 1 ? true : false}
                                offColor="#C8C8C8"
                                onColor="#0093ed"
                                height={30}
                                width={70}
                                className="react-switch"
                                uncheckedIcon={
                                  <div className="react-switch-off">Disable</div>
                                }
                                checkedIcon={
                                  <div className="react-switch-on">Enable</div>
                                }
                              />
                            </td>
                            <td className='text-center'>
                              <Switch
                                onChange={(e) => {
                                  Togglechange(val._id, e, "affilation_program_enable");
                                }}
                                checked={val.affilation_program_enable === 1 ? true : false}
                                offColor="#C8C8C8"
                                onColor="#0093ed"
                                height={30}
                                width={70}
                                className="react-switch"
                                uncheckedIcon={
                                  <div className="react-switch-off">Disable</div>
                                }
                                checkedIcon={
                                  <div className="react-switch-on">Enable</div>
                                }
                              />
                            </td>
                            <td className='text-center'>
                              <Link to={`/view/app_update/${val._id}`}>
                                <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                              </Link>
                                {
                                  permission["type"] == 1 ?
                                  <Button variant="outline-danger" onClick={() => DeleteData(val._id)} size="sm" className="btn-icon"><i className='bx bx-trash-alt' ></i></Button>
                                  :""
                                }
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                  {
                    loading == false && Data.length === 0 ? <tr>
                      <td colSpan="100%" className="p-0">
                        <div className='no-found'>
                          <img src="../../not-found/image.svg" />
                          <p>No Found Remotes</p>
                        </div>
                      </td>
                    </tr> : ""

                  }
                </Table>
                {Data.length > size ? (
                  <div className="pagination-custom">
                    <Pagination
                      showTitle={false}
                      className="pagination-data"
                      onChange={paginationData}
                      total={Data.length}
                      current={current}
                      pageSize={size}
                      showSizeChanger={false}
                      itemRender={PrevNextArrow}
                      onShowSizeChange={PerPageChange}
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
  )
}

export default App_update