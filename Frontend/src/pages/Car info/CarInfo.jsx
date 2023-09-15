import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';
import { Button, Form, Card, Col, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import { API } from "../../App";
import { SelectPicker } from "rsuite";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import DateRangePicker from 'react-bootstrap-daterangepicker';

var Page_array = [];
const CraInfo = () => {
  const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [loading, setloading] = useState(true)
  const [query, setquery] = useState({
    live:""
  })
  const GetData = async () => {
    const result = await API.post("/api/car_info/Get_create_carinfo_rc", {}, { headers: { Authorization: `Bearer ${token}` } })
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

  const CarinfoSearch = async(e , name)=>{
    if(name==="live"){
      setquery({ ...query, [name]: e.target.value });
    }
   const Form = new FormData();
   Form.append('live',name=='live'?e.target.value:query.live)
   const result = await API.post("/api/car_info/search_carinfo_rc", Form, { headers: { Authorization: `Bearer ${token}` } })
    setData(result.data)
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">CarInfo Rc Count</h3>
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
        <DateRangePicker onApply={(e)=>{CarinfoSearch(e,"live")}} onCancel={(e)=>{e.target.name='live';e.target.value="";CarinfoSearch(e,"live")}}>
            <input type="text" name="live" value={query.live} placeholder="Select  Date" className="form-control wv-225 my-1 ms-3 " />
        </DateRangePicker>

        </div>
      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
                <Card.Body>
                  <Table bordered responsive>
                    <thead>
                      <tr class="text-center">
                          <th rowspan="2">No</th>
                          <th rowspan="2">Date</th>
                          <th colspan="3" class="bg1">RTO to CarInfo</th>
                          <th colspan="3" class="bg2">CarInfo to RTO</th>
                      </tr>
                      <tr class="text-center">
                          <th class="bg1">Success</th>
                          <th class="bg1">Fail</th>
                          <th class="bg1">Total</th>
                          <th class="bg2">Success</th>
                          <th class="bg2">Fail</th>
                          <th class="bg2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    getData1(current, size).map((val, i) => {
                      return (
                      <tr class="text-center">
                        <td width="1%"> {(current === 1) ? i + 1 : current * size + i + 1 - size} </td>
                        <td width="5%">{dayjs(val.date).format('YYYY-MM-DD')}</td>
                        <td width="5%" class="bg1">{val.rto_to_carinfo_success}</td>
                        <td width="5%" class="bg1">{val.rto_to_carinfo_fail}</td>
                        <td width="5%" class="bg1">{val.rto_to_carinfo_success + val.rto_to_carinfo_fail}</td>
                        <td width="5%" class="bg2">{val.carinfo_to_rto_success}</td>
                        <td width="5%" class="bg2">{val.carinfo_to_rto_fail}</td>
                        <td width="5%" class="bg2">{val.carinfo_to_rto_success + val.carinfo_to_rto_fail}</td>
                      </tr>
                      )
                    })
                  }
                  {
                    Data.length != 0 ?
                      <tr class="text-center">
                        <td colspan="2" class="fw-600">Total Record Of API Calling</td>
                        <td class="fw-600 bg1">{Data.reduce((total, val) => total + val.rto_to_carinfo_success, 0)}</td>
                        <td class="fw-600 bg1">{Data.reduce((total, val) => total + val.rto_to_carinfo_fail, 0)}</td>
                        <td class="fw-600 bg1">{Data.reduce((total, val) => total + val.rto_to_carinfo_success + val.rto_to_carinfo_fail, 0)}</td>
                        <td class="fw-600 bg2">{Data.reduce((total, val) => total + val.carinfo_to_rto_success, 0)}</td>
                        <td class="fw-600 bg2">{Data.reduce((total, val) => total + val.carinfo_to_rto_fail, 0)}</td>
                        <td class="fw-600 bg2">{Data.reduce((total, val) => total + val.carinfo_to_rto_success + val.carinfo_to_rto_fail, 0)}</td>
                      </tr>:""
                  }
                    </tbody>
                    {
                    loading ==false && Data.length === 0 ? <tr>
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

export default CraInfo