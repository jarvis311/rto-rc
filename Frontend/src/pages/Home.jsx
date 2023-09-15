import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import { API } from '../App';
import Cookies from 'js-cookie';

const Home = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState(
        {
            RC_detail: "",
            RC_count: "",
            User: "",
            License_Information: "",
        }
    )
    const getData = async () => {
        const Result = await API.post("/api/dashboard/get_dashboard", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData({
            RC_detail: Result.data.response.RC_detail,
            RC_count: Result.data.response.RC_count,
            User: Result.data.response.User,
            License_Information: Result.data.response.License_Information,
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="vv-dashboard">
                <Row>
                    <Col xxl={3} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="counter orange">
                                    <div className="counter-media">
                                        <i class='bx bxs-info-circle'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{Data.RC_detail}</h3>
                                        <p>RC Details</p>
                                    </div>
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="counter pink">
                                    <div className="counter-media">
                                        <i class='bx bxs-credit-card'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{Data.RC_count}</h3>
                                        <p>RC Count</p>
                                    </div>
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="counter green">
                                    <div className="counter-media">
                                        <i class='bx bx-book-content'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{Data.User}</h3>
                                        <p>User</p>
                                    </div>
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                            <Card>
                                <Card.Body>
                                    <div className="counter blue">
                                    <div className="counter-media">
                                        <i class='bx bx-news'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{Data.License_Information}</h3>
                                        <p>License Information</p>
                                    </div>
                                    </div>
                                </Card.Body>
                            </Card>
                    </Col>
                </Row>
                {/* <Row>
                    <Col xxl={3} md={6}>
                        <Card>
                            <Card.Body>
                                <h5>
                                    <i className='bx bxs-credit-card'></i>
                                    <span>RC Information</span>
                                </h5>
                                <Link to="/rc_details">
                                    <h6>RC Deatils</h6>
                                </Link>
                                <Link to="/rc_count">
                                    <h6>RC Count</h6>
                                </Link>
                                <Link to="/rc_block">
                                    <h6>RC Block</h6>
                                </Link>
                                <Link to="/license_Information">
                                    <h6>License Info</h6>
                                </Link>
                                <Link>
                                    <h6>user Document</h6>
                                </Link>
                                <Link to="/fail_data">
                                    <h6>Fail Data</h6>
                                </Link>
                                <Link to="/rc_reminder">
                                    <h6>Reminder</h6>
                                </Link>
                                <Link to="/rc_feedback">
                                    <h6>Feedback</h6>
                                </Link>
                                <Link>
                                    <h6>RC Report</h6>
                                </Link >
                                <Link to="/notification_report">
                                    <h6>Notification Report</h6>
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={9} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="chart-title">
                                    <h4>Vehicle Count</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xxl={3} md={6}>
                        <Card>
                            <Card.Body>
                                <h5>
                                <i class='bx bxs-check-circle'></i>
                                <span>API</span>
                                </h5>
                                <Link to="/app_update">
                                    <h6>App Update</h6>
                                </Link>
                                <Link>
                                    <h6>App Check</h6>
                                </Link>
                                <Link to="/proxy">
                                    <h6>Authorization</h6>
                                </Link>
                                <Link to="/API_Priority">
                                    <h6>API Priority</h6>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={9} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="chart-title">
                                    <h4>Vehicle Source</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> */}
            </div>
            {/* <div className="vv-dashboard">
                <Row>
                    <Col xxl={3} xl={4} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="counter orange">
                                    <div className="counter-media">
                                        <i class='bx bxs-info-circle'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{labelData.circle}</h3>
                                        <p>RC Details</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="counter pink">
                                    <div className="counter-media">
                                        <i class='bx bxs-credit-card'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{labelData.user}</h3>
                                        <p>RC Count</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="counter green">
                                    <div className="counter-media">
                                        <i class='bx bx-book-content'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{labelData.place}</h3>
                                        <p>User Document</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="counter blue">
                                    <div className="counter-media">
                                        <i class='bx bx-news'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{labelData.contact}</h3>
                                        <p>License Information</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xxl={3} md={6}>
                        <Card>
                            <Card.Body>
                                <h5>
                                    <i className='bx bxs-credit-card'></i>
                                    <span>RC Information</span>
                                </h5>
                                <Link to="/rc_details">
                                    <h6>RC Deatils</h6>
                                </Link>
                                <Link to="/rc_count">
                                    <h6>RC Count</h6>
                                </Link>
                                <Link to="/rc_block">
                                    <h6>RC Block</h6>
                                </Link>
                                <Link to="/license_Information">
                                    <h6>License Info</h6>
                                </Link>
                                <Link>
                                    <h6>user Document</h6>
                                </Link>
                                <Link to="/fail_data">
                                    <h6>Fail Data</h6>
                                </Link>
                                <Link to="/rc_reminder">
                                    <h6>Reminder</h6>
                                </Link>
                                <Link to="/rc_feedback">
                                    <h6>Feedback</h6>
                                </Link>
                                <Link>
                                    <h6>RC Report</h6>
                                </Link >
                                <Link to="/notification_report">
                                    <h6>Notification Report</h6>
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={9} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="chart-title">
                                    <h4>Vehicle Count</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xxl={3} md={6}>
                        <Card>
                            <Card.Body>
                                <h5>
                                <i class='bx bxs-check-circle'></i>
                                <span>API</span>
                                </h5>
                                <Link to="/app_update">
                                    <h6>App Update</h6>
                                </Link>
                                <Link>
                                    <h6>App Check</h6>
                                </Link>
                                <Link to="/proxy">
                                    <h6>Authorization</h6>
                                </Link>
                                <Link to="/API_Priority">
                                    <h6>API Priority</h6>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={9} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="chart-title">
                                    <h4>Vehicle Source</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div> */}
        </Layout>
    )
}

export default Home