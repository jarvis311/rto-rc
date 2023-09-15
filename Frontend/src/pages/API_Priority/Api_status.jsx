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
const Api_status = () => {
  const token = Cookies.get("fmljwt");
  const { permission, setPermission } = useContext(AuthContext)
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [loading, setloading] = useState(true)
  const GetData = async () => {
    const result = await API.post("/api/api_status/get_api_statuses", {}, { headers: { Authorization: `Bearer ${token}` } })
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
    var status;
    if (name === "status") {
      status = e === true ? 1 : 0;
    }
    const Form = new FormData();
    Form.append("id", id);
    Form.append("name", name);
    Form.append("status", status);
    let result
    if(permission["type"] == 1){
       result = await API.post("/api/api_status/toggle_api_statuses", Form, { headers: { Authorization: `Bearer ${token}` } });
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
          await API.post(`/api/api_status/delete_api_statuses`, form, { headers: { Authorization: `Bearer ${token}` } });
          GetData();
        } else {
          count = 10
          clearInterval(swalCountdownInterval)
        }
      });
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(Data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setData(tempData);
    var order = [];
    var x = (tempData).map(function (index, element) {
      order.push({
        id: index._id,
        position: element + 1,
      });
    });
    sortCategory(order);
  };
  const sortCategory = async (Data) => {
    const results = await API.post('/api/api_status/drag_and_drop_api_statuses', Data, { headers: { Authorization: `Bearer ${token}` } })
    if (results.status === 200) {
      toast.success(results.response_message);
    }
  }

  useEffect(() => {
    GetData()
  }, [])
  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">API Priority</h3>
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
              <Link to="/Add/API_Priority" className="my-1 ms-3">
                <Button variant="primary" value="create">Add New</Button>
              </Link> : ""
          }

        </div>
      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Card.Body>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th width="5%" className="text-center">No</th>
                        <th width="70%">Third Part API</th>
                        <th width="10%">Status</th>
                        <th width="15%" className='text-center'>Action</th>
                      </tr>
                    </thead>
                    <Droppable droppableId="droppable-1">
                      {(provider) => (
                        <tbody ref={provider.innerRef}
                          {...provider.droppableProps}>
                          {
                            getData1(current, size).map((val, ind) => (
                              <Draggable
                                key={val._id}
                                draggableId={val._id}
                                index={ind}>
                                {(provider) => (
                                  <tr key={ind} {...provider.draggableProps} ref={provider.innerRef}>
                                    <td {...provider.dragHandleProps} className='text-center'>{(current === 1) ? ind + 1 : current * size + ind + 1 - size}</td>
                                    <td {...provider.dragHandleProps}>{val.third_party_api}</td>
                                    <td className='text-center'>
                                      <Switch
                                        onChange={(e) => {
                                          Togglechange(val._id, e, "status");
                                        }}
                                        checked={val.status === 1 ? true : false}
                                        offColor="#C8C8C8"
                                        onColor="#0093ed"
                                        height={30}
                                        width={70}
                                        className="react-switch"
                                        uncheckedIcon={
                                          <div className="react-switch-off">Close</div>
                                        }
                                        checkedIcon={
                                          <div className="react-switch-on">Open</div>
                                        }
                                      />
                                    </td>
                                    <td className='text-center'>
                                      <Link to={`/view/API_Priority/${val._id}`}>
                                        <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                                      </Link>
                                      {
                                        permission["type"] == 1 ?
                                          <Button variant="outline-danger" onClick={() => DeleteData(val._id)} size="sm" className="btn-icon"><i className='bx bx-trash-alt' ></i></Button>
                                          : ""
                                      }
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            ))
                          }
                          {provider.placeholder}
                          {
                            loading === false && Data.length === 0 ? <tr>
                              <td colSpan="100%" className="p-0">
                                <div className='no-found'>
                                  <img src="../../not-found/iptvsubcategory.svg" />
                                  <p>No Found IPTV Sub Categories</p>
                                </div>
                              </td>
                            </tr> : ""
                          }
                        </tbody>
                      )}
                    </Droppable>
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
              </DragDropContext>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default Api_status