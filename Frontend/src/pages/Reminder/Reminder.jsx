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
import dayjs from "dayjs";

var Page_array = [];
var State_array = [];
var Reminder_type_array = [];
var Doc_type_array = [];
const Reminder = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [PageHook, setPageHook] = useState([])
    const [loading, setloading] = useState(true)
    const [State_Data, setState_Data] = useState([])
    const [Remider_type_Data, setRemider_type_Data] = useState([])
    const [Doc_type_Data, setDoc_type_Data] = useState([])
    const [Query, setQuery] = useState({
        state: "",
        searchvalue: "",
        reminder_type: "",
        doc_type: "",
    });

    const GetData = async () => {
        const result = await API.post("/api/rc_reminder/Get_reminder", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
        PageGetData()
        stateGetData()
        Reminder_type_GetData()
        Doc_type_GetData()
        setloading(false)
    }

    const stateGetData = async () => {
        var state = ['AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CG', 'DD', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KL', 'LA', 'LD', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OD', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB']
        State_array = []
        State_array.push({ label: "All", value: "" })
        state.map((val, index) => {
            State_array.push({ label: val, value: val })
        })
        setState_Data(State_array)
    };

    const Reminder_type_GetData = async () => {
        var ReminderData = [
            {lable:"Before a month" , value:"1"},
            {lable:"Before a Week" , value:"2"},
            {lable:"Before 1 Day" , value:"3"},
            {lable:"Same Day" , value:"4"},
        ]
        Reminder_type_array = []
        Reminder_type_array.push({ label: "Select Reminder Type", value: "" })
        ReminderData.map((val, index) => {
            Reminder_type_array.push({ label: val.lable, value: val.value })
        })
        setRemider_type_Data(Reminder_type_array)
    };

    const Doc_type_GetData = async () => {
        var DocumentData = [
            {lable:"Driving lincese" , value:1},
            {lable:"Insurance" , value:2},
            {lable:"PUC" , value:3},
            {lable:"Registration Certificate" , value:4},
            {lable:"Service Log" , value:5},
            {lable:"Other Document" , value:6},
            {lable:"Fitness Upto" , value:7},
        ]
        Doc_type_array = []
        Doc_type_array.push({ label: "Select Document Type", value: "" })
        DocumentData.map((val, index) => {
            Doc_type_array.push({ label: val.lable, value: val.value })
        })
        setDoc_type_Data(Doc_type_array)
    };

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

    const QueryHendler = async (e, name) => {
        if (name === "searchvalue") {
            setQuery({ ...Query, [e.target.name]: e.target.value });
        } else if (name === "") {
            GetData()
        } else {
            console.log('e', e)
            setQuery({ ...Query, [name]: e })
        }
        const Form = new FormData()
        Form.append("searchvalue", name == "searchvalue" ? e.target.value : Query.searchvalue);
        Form.append("state", name == "state" ? e : Query.state)
        Form.append("reminder_type", name == "reminder_type" ? e : Query.reminder_type)
        Form.append("doc_type", name == "doc_type" ? e : Query.doc_type)
        const result = await API.post("/api/rc_reminder/Get_searching_reminder", Form, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
    }


    useEffect(() => {
        GetData()
    }, [])
  return (
    <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">Reminder</h3>
                <div className="page-heading-right">

                    <Form.Control
                        type="text"
                        name="searchvalue"
                        placeholder="Search Registration No."
                        className="wv-200 my-1 ms-3"
                        // value={search[2].search.name}
                        onChange={(e) => QueryHendler(e, "searchvalue")}

                    />

                    <SelectPicker
                        cleanable={false}
                        data={State_Data}
                        searchable={false}
                        // style={{ width: 224 }}
                        defaultValue={""}
                        className="wv-200 my-1 ms-3"
                        onChange={(e) => QueryHendler(e, "state")}
                    />

                      <SelectPicker
                        cleanable={false}
                        data={Remider_type_Data}
                        searchable={false}
                        // style={{ width: 224 }}
                        defaultValue={""}
                        className="wv-200 my-1 ms-3"
                        onChange={(e) => QueryHendler(e, "reminder_type")}
                    />
                      <SelectPicker
                        cleanable={false}
                        data={Doc_type_Data}
                        searchable={false}
                        // style={{ width: 224 }}
                        defaultValue={""}
                        className="wv-200 my-1 ms-3"
                        onChange={(e) => QueryHendler(e, "doc_type")}
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
                                            <th width="10%">User ID</th>
                                            <th width="15%">User</th>
                                            <th width="15%">Reg. Number</th>
                                            <th width="15%">Document Type</th>
                                            <th width="40%">Reminder Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData1(current, size).map((val, i) => {
                                                console.log('val.reminder_type', val.reminder_type)
                                                return (
                                                    <tr>
                                                        <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                                        <td>{val.user_id.php_id}</td>
                                                        <td>{val.user_id.name}</td>
                                                        <td>{val.reg_number}</td>
                                                        <td>
                                                        {
                                                        val.doc_type == 1 ? "Driving lincese" :
                                                        val.doc_type == 2 ? "Insurance":
                                                        val.doc_type == 3 ? "PUC" :
                                                        val.doc_type == 4 ? "Registration certificate" :
                                                        val.doc_type == 5 ? "Service Log" :
                                                        val.doc_type == 6 ? "Other Document" :
                                                        val.doc_type == 7 ? "Fitness Upto" : ""
                                                        }
                                                        </td>
                                                        <td>
                                                        {
                                                        val.reminder_type.split(",").map((v)=>{
                                                            return(
                                                                v == "1" ?
                                                                <Button variant="outline-primary" size="sm" className="me-1">Before a month</Button>
                                                                :v=="2" ?
                                                                <Button variant="outline-primary" size="sm" className="me-1">Before a Week</Button>
                                                                :v=="3"?
                                                                <Button variant="outline-primary" size="sm" className="me-1">Before 1 Day</Button>
                                                                : v=="4"?
                                                                <Button variant="outline-primary" size="sm" className="me-1">Same Day</Button>
                                                                :"" 
                                                            )

                                                            })
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

export default Reminder