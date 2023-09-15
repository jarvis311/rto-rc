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
var status_array = [];
const Notification_Report = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [PageHook, setPageHook] = useState([])
    const [loading, setloading] = useState(true)
    const [StatusData, setStatusData] = useState([])
    const [Query, setQuery] = useState({
        status: "",
    });

    const GetData = async () => {
        const result = await API.post("/api/notification_report/Get_notifiction_report", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
        PageGetData()
        StatusDropdwon()
        setloading(false)
    }

    const StatusDropdwon = async () => {
        var StatusData = ["Reminder","Fail Data"]
        status_array = []
        status_array.push({ label: "Select Type", value: "" })
        StatusData.map((val, index) => {
            status_array.push({ label: val, value: val })
        })
        setStatusData(status_array)
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
        if(e == ""){
            GetData()
        }else{
            setQuery({ ...Query, [name]: e })
           const Form = new FormData()
           Form.append("status", name == "status" ? e : Query.status)
           const result = await API.post("/api/notification_report/searching_notification", Form, { headers: { Authorization: `Bearer ${token}` } })
           setData(result.data.Data)
        }
    }


    useEffect(() => {
        GetData()
    }, [])
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3 className="my-1">Notification Report</h3>
        <div className="page-heading-right">
                <SelectPicker
                cleanable={false}
                data={StatusData}
                searchable={false}
                // style={{ width: 224 }}
                defaultValue={""}
                className="wv-200 my-1 ms-3"
                onChange={(e) => QueryHendler(e, "status")}
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
                                    <th width="15%">Type</th>
                                    <th width="15%">Date</th>
                                    <th width="30%">Total Records</th>
                                    <th width="20%">Success Data</th>
                                    <th width="15%">Fail Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getData1(current, size).map((val, i) => {
                                        return (
                                            <tr>
                                                <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                                <td>{val.type}</td>
                                                <td>{dayjs(val.date).format("DD-MM-YYYY")}</td>
                                                <td>{val.total}</td>
                                                <td>{val.success}</td>
                                                <td>{val.fail}</td>
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

export default Notification_Report