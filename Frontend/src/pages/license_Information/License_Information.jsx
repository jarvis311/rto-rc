import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { Button, Form, Card, Col, Row, Table , Modal } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import Switch from 'react-switch';
import Fancybox from "../../Component/FancyBox";
import { API } from "../../App";
import { toast } from "react-toastify";
import $ from "jquery";
import Swal from "sweetalert2";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";
import dayjs from "dayjs"

var Page_array = [];
var state_array = [];
const License_Information = () => {
    const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [loading, setloading] = useState(true)

  const GetData = async () => {
    const result = await API.post("/api/license_info/Get_license_info", {}, { headers: { Authorization: `Bearer ${token}` } })
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

  useEffect(() => {
    GetData()
  }, [])

  const [show, setShow] = useState(false);
  const [View_Data, setView_Data] = useState({
    _id: "",
    license_no:"",
    dob:"",
    name:"",
    current_status:"",
    date_of_issue:"",
    last_transaction_at:"",
    old_new_dl_no:"",
    from_non_transport:"",
    to_non_transport:"",
    from_transport:"",
    to_transport:"",
    hazardous_valid_till:"",
    hill_vaild_till:"",
    cov_category:"",
    class_of_vehicle:"",
    cov_issue_date:"",
    blood_group:"",
    gender:"",
    citizen:""
})
  const handleShow = async (id) => {
    setShow(true)
    const Form = new FormData()
    Form.append('id', id)
    const result = await API.post("/api/license_info/Get_license_info_ID", Form, { headers: { Authorization: `Bearer ${token}` } })
    setView_Data({
    _id: result.data.Data[0]._id,
    license_no:result.data.Data[0].license_no,
    dob:result.data.Data[0].dob,
    name:result.data.Data[0].name,
    current_status:result.data.Data[0].current_status,
    date_of_issue:result.data.Data[0].date_of_issue,
    last_transaction_at:result.data.Data[0].last_transaction_at,
    old_new_dl_no:result.data.Data[0].old_new_dl_no,
    from_non_transport:result.data.Data[0].from_non_transport,
    to_non_transport:result.data.Data[0].to_non_transport,
    from_transport:result.data.Data[0].from_transport,
    to_transport:result.data.Data[0].to_transport,
    hazardous_valid_till:result.data.Data[0].hazardous_valid_till,
    hill_vaild_till:result.data.Data[0].hill_vaild_till,
    cov_category:result.data.Data[0].cov_category,
    class_of_vehicle:result.data.Data[0].class_of_vehicle,
    cov_issue_date:result.data.Data[0].cov_issue_date,
    blood_group:result.data.Data[0].blood_group,
    gender:result.data.Data[0].gender,
    citizen:result.data.Data[0].citizen
    })
}
const handleClose = () => setShow(false);

const [query, setquery] = useState({
    search:""
})

const searching = async(e , name) =>{
if(name == "search"){
    setquery({...query , [name] : e.target.value})
}
const Form = new FormData();
Form.append("search", name == "search" ? e.target.value : query.search);
const result = await API.post("/api/license_info/searching_license_info", Form, { headers: { Authorization: `Bearer ${token}` } });
setData(result.data.Data);

};

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">License Information</h3>
        <div className="page-heading-right">
          <Form.Control
            type="text"
            name="reg_no"
            placeholder=" Serach License No."
            className="wv-200 my-1 ms-3"
          // value={search[2].search.name}
          onChange={(e) => searching(e , "search")}
          />
         
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
                      <th width="10%">License No</th>
                      <th width="15%">Owner Name</th>
                      <th width="15%">Current Status</th>
                      <th width="15%">Date of Issue</th>
                      <th width="15%">Valid Till</th>
                      <th width="15%">Date</th>
                      <th width="15%">Show Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData1(current, size).map((val, i) => {

                        return (
                          <tr>
                            <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                            <td>{val.license_no}</td>
                            <td>{val.name}</td>
                            <td>{val.current_status}</td>
                            <td>{dayjs(val?.date_of_issue).format('DD-MM-YYYY')}</td>
                            <td>{dayjs(val?.to_non_transport).format('DD-MM-YYYY')}</td>
                            <td>{dayjs(val?.date).format('DD-MM-YYYY')}</td>
                            <td className='text-center'>
                                <Button variant="primary" onClick={() => handleShow(val._id)} >More Details</Button>
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

      {/* Modal */}

      {/* Modal */}

              <Modal
                show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        User Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col >
                            <span>ID</span> - <span>{View_Data._id}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Owner Name</span> - <span>{View_Data.name}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>License No</span> - <span>{View_Data.license_no}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>DOB</span> - <span>{dayjs(View_Data?.dob).format('DD-MM-YYYY')}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Current Status</span> - <span>{View_Data.current_status}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Date Of Issue</span> - <span>{dayjs(View_Data?.date).format('DD-MM-YYYY')}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Last Transaction At</span> - <span>{View_Data.last_transaction_at}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Old New DL No</span> - <span>{View_Data.old_new_dl_no}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>From Non Transport</span> - <span>{View_Data.from_non_transport}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>To Non Transport</span> - <span>{dayjs(View_Data?.to_non_transport).format('DD-MM-YYYY')}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>From Transport</span> - <span>{dayjs(View_Data?.from_transport).format('DD-MM-YYYY')}</span>
                        </Col>
                    </Row>

                    <Row>
                        <Col >
                        <span>To Transport</span> - <span>{dayjs(View_Data?.to_transport).format('DD-MM-YYYY')}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Hazardous Valid Till</span> - <span>{View_Data.hazardous_valid_till}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Hill Valid Till</span> - <span>{View_Data.hill_vaild_till}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Cov Category</span> - <span>{View_Data.cov_category}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Class Of Vehicle</span> - <span>{View_Data.class_of_vehicle}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <span>Cov Issue Date</span> - <span>{View_Data.cov_issue_date}</span>
                        </Col>
                    </Row>

                </Modal.Body>
            </Modal>
    </Layout>
  )
}

export default License_Information