import { Container, Row, Col } from 'react-bootstrap';
import { getCookie } from "../../../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../utils/constant";
import Sidebar from "../../../Components/Sidebar/Sidebar";
// import AccountNav from "../../../components/accountNav";
// import * as Icon from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = () => {

    const bearerToken = getCookie("bearerToken");
    const headers = {
        Authorization: `Bearer ${bearerToken}`,
    };
    const [dashboardData, setDashboardData] = useState({
        campaignCount:0,
        userCount:0,
        disqualifiedCount:0,
        roleCount:0
    });
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseURL}dashboard/getDashboardCountForAdmin`, { headers})
        .then((response) => {
            const { campaignCount, userCount, roleCount } = response.data;
            setDashboardData({
            campaignCount,
            userCount,
            roleCount
            });
            setIsLoading(false);
            // console.log(response);
        })
        .catch((err) => {
            // console.error(err?.response?.data?.message);
            setIsLoading(false);
        });
    }, []);

  return (
    <>
      <Container fluid>
        <Row>
            <Sidebar />
            <Col lg={10} className='p-4'>
                <h5 className='mb-3'>Dashboard</h5>
                {isLoading ? ( // Render Spinner while loading
                            <div className='d-flex justify-content-center align-items-center pt-5'>
                                <Spinner animation="grow" variant="warning" />
                            </div>
                        ) : (
                <Row>
                    <Col lg={3}>
                        <Col lg={12} className='p-3 rounded-4 border'>
                            <p>Campaigns</p>
                            <h5>{ dashboardData.campaignCount }</h5>
                        </Col>
                    </Col>
                    <Col lg={3}>
                        <Col lg={12} className='p-3 rounded-4 border'>
                            <p>Users</p>
                            <h5>{ dashboardData.userCount }</h5>
                        </Col>
                    </Col>
                    <Col lg={3}>
                        <Col lg={12} className='p-3 rounded-4 border'>
                            <p>Roles</p>
                            <h5>{ dashboardData.roleCount }</h5>
                        </Col>
                    </Col>
                    <Col lg={3}>
                        <Col lg={12} className='p-3 rounded-4 border'>
                            <p>Payments</p>
                            <h5>0</h5>
                        </Col>
                    </Col>
                </Row>
                )}
            </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
