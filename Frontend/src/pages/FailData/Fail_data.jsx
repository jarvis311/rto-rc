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
const Fail_data = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [PageHook, setPageHook] = useState([])
    const [loading, setloading] = useState(true)
    const [State_Data, setState_Data] = useState([])
    const [Query, setQuery] = useState({
        state: "",
        searchvalue: "",
    });

    const GetData = async () => {
        const result = await API.post("/api/fail_data/Get_fail_data", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
        PageGetData()
        stateGetData()
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
            setQuery({ ...Query, [name]: e })
        }
        const Form = new FormData()
        Form.append("searchvalue", name == "searchvalue" ? e.target.value : Query.searchvalue);
        Form.append("state", name == "state" ? e : Query.state)
        const result = await API.post("/api/fail_data/serach_fail_data", Form, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
    }


    useEffect(() => {
        GetData()
    }, [])
    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">User Document</h3>
                <div className="page-heading-right">
                    <SelectPicker
                        cleanable={false}
                        data={State_Data}
                        searchable={false}
                        // style={{ width: 224 }}
                        defaultValue={""}
                        className="wv-200 my-1 ms-3"
                        onChange={(e) => QueryHendler(e, "state")}
                    />

                    <Form.Control
                        type="text"
                        name="searchvalue"
                        placeholder="Search Vehicle No."
                        className="wv-200 my-1 ms-3"
                        // value={search[2].search.name}
                        onChange={(e) => QueryHendler(e, "searchvalue")}

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
                                            <th width="35%">Vehicle No</th>
                                            <th width="30%">Date</th>
                                            <th width="30%">Send Notification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData1(current, size).map((val, i) => {
                                                return (
                                                    <tr>
                                                        <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                                        <td>{val.reg_no}</td>
                                                        <td>{dayjs(val.date).format("DD-MM-YYYY")}</td>
                                                        <td>
                                                            <Button variant="outline-info" size="sm" className="btn-icon">
                                                                <i class='bx bxs-send'></i>
                                                            </Button>
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

export default Fail_data