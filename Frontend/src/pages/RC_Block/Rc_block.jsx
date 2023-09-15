import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { Button, Form, Card, Col, Row, Table } from "react-bootstrap";
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

var Page_array = [];
var state_array = [];
const Rc_block = () => {
  const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [stateHook, setstateHook] = useState([])
  const [loading, setloading] = useState(true)
  const [SaveData, setSaveData] = useState({
    reg_no:"",
  })
  const GetData = async () => {
    const result = await API.post("/api/rc_block/get/rc_block", {}, { headers: { Authorization: `Bearer ${token}` } })
    setData(result.data.Data)
    PageGetData()
    StateGetData()
    setloading(false)
  }

  const SaveDatahendler = async(e)=>{
    setSaveData({...SaveData , [e.target.name] : e.target.value})
  }

  const Sumite = async()=>{
    if(SaveData.reg_no ==""){
      toast.error("Required Registation No ")
    }else{
      const Form = new FormData()
      Form.append('reg_no', SaveData.reg_no)
      const result = await API.post('/api/rc_block/add/rc_block' , Form , {headers :{Authorization : `Bearer ${token}`}})
      if(result.data.Response_massage == "all Ready Added"){
        toast.error("Registration No allready Exits !")
      }else{ 
        toast.success("Data Save Successfuly ...")
        GetData()
      }
    }
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

  const StateGetData = async () => {
    const collectionNames = ['AN', 'AP', 'AR', 'AS', 'BR', 'BH', 'CH', 'CG', 'DD', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KR', 'KL', 'LA', 'LD', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OD', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB'];
    state_array = []
    state_array.push({ label: "All", value: "" })
    collectionNames.map((val, index) => {
      state_array.push({ label: val, value: val })
    })
    setstateHook(state_array)
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
    const result = await API.post("/api/rc_block/toggle_Rc_block", Form, { headers: { Authorization: `Bearer ${token}` } });
    if (result) {
      toast.success(" status Update successfully");
      GetData();
    }
  };

  const [query, setquery] = useState({
    serach:""
  })
  const searching = async(e , name)=>{
    if(name == "search"){
      setquery({...query , [name] : e})
  }
  const Form = new FormData()
  Form.append('search' , name == "search" ? e : query.serach)
  const Result = await API.post('/api/rc_block/searching_Rc_block' , Form , { headers: { Authorization: `Bearer ${token}` } })
  setData(Result.data.Data)
  }


  useEffect(() => {
    GetData()
  }, [])

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">RC Block</h3>
        <div className="page-heading-right">
          <SelectPicker
            cleanable={false}
            data={stateHook}
            searchable={false}
            // style={{ width: 224 }}
            defaultValue={""}
            className="wv-200 my-1 ms-3"
            onChange={(e) => searching(e , "search")}
          />

          <Form.Control
            type="text"
            name="reg_no"
            placeholder="Block Registation No."
            className="wv-200 my-1 ms-3"
          // value={search[2].search.name}
          onChange={SaveDatahendler}
          />
          <Button variant="primary" value="create" onClick={Sumite}>Add</Button>

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
                      <th width="50%">Reg. No</th>
                      <th width="45%">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData1(current, size).map((val, i) => {
                        return (
                          <tr>
                            <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                            <td>{val.reg_no}</td>
                            <td>
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
                                  <div className="react-switch-off">Disable</div>
                                }
                                checkedIcon={
                                  <div className="react-switch-on">Enable</div>
                                }
                              />
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

export default Rc_block