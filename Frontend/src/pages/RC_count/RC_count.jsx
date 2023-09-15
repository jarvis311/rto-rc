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
const RC_count = () => {
  const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [PageHook, setPageHook] = useState([])
  const [stateHook, setstateHook] = useState([])
  const [loading, setloading] = useState(true)
  const GetData = async () => {
    const result = await API.post("/api/rc_count/Get_state_count", {}, { headers: { Authorization: `Bearer ${token}` } })
    setData(result.data.Data)
    StateGetData()
    setloading(false)
  }

  // Paggintion Code //
  const getData1 = (current, pageSize) => {
    return Data.slice((current - 1) * pageSize, current * pageSize);
  };



  const StateGetData = async () => {
    const collectionNames = ['AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CG', 'DD', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KR', 'KL', 'LA', 'LD', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OD', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB'];
    state_array = []
    state_array.push({ label: "All", value: "" })
    collectionNames.map((val, index) => {
      state_array.push({ label: val, value: val })
    })
    setstateHook(state_array)
  };

  const StateFind = async (e, name) => {
    const Form = new FormData()
    Form.append('state', e)
    const res = await API.post("/api/rc_count/Get_searching_state_count", Form, { headers: { Authorization: `Bearer ${token}` } })
    if (res.data.Data != undefined) {
      setData(res.data.Data)
    } else {
      GetData()
    }
  }


  useEffect(() => {
    GetData()
  }, [])

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">Vehicle Count</h3>
        <div className="page-heading-right">
          <SelectPicker
            cleanable={false}
            data={stateHook}
            searchable={false}
            // style={{ width: 224 }}
            defaultValue={""}
            className="wv-100 my-1 ms-3"
            onChange={(e) => StateFind(e, 'state')}
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
                      <th width="50%">state</th>
                      <th width="45%">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Data.map((val, i) => {
                        return (
                          <tr>
                            <td className='text-center'>{i + 1}</td>
                            <td>{val.modal}</td>
                            <td>{val.count}</td>
                          </tr>
                        )
                      })
                    }
                    <tr>
                      <td colspan="2" class="text-end text-success fw-700">Total Record Of All State : </td>
                      <td>{Data.reduce((total, val) => total + val.count, 0)}</td>
                    </tr>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default RC_count