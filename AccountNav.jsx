import {  Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getCookie } from "../../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/constant";
import * as Icon from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = () => {

    const bearerToken = getCookie("bearerToken");
    const headers = {
        Authorization: `Bearer ${bearerToken}`,
    };
    const [user, setUser]= useState({
        credits: 0
    })

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = () => {
        axios.get(`${baseURL}user/getUserDetailsByUserId`,
            {
                headers: { ...headers },
            }
            )
            .then((response) => {
            const { credits } = response.data.data;
            setUser({
                credits
            });
            setIsLoading(false);
            // console.log(user.credits);
            
            // console.log(response.data);
            })
            .catch((err) => {
            // console.error(err?.response?.data?.message);
            setIsLoading(false);
            });
        };
        fetchData();
    }, []);

  return (
    <>
        <Row className='mb-3'>
            <Col lg={2} className='ms-auto my-auto text-end'>
                {isLoading ? ( // Render Spinner while loading
                            <div className=''>
                                <Spinner animation="grow" variant="warning" />
                            </div>
                        ) : (
                        <h5 className='my-auto text-muted'>
                            <Icon.CashStack className='mb-1' /> {user.credits}
                        </h5>
                )}
                
            </Col>
            <Col lg={2} className=''>
                <div className='d-grid gap-2  '>
                    <Button variant="warning"><Icon.QuestionCircle className='mb-1' /> Help</Button>
                </div>
            </Col>
        </Row>
    </>
  );
};

export default Dashboard;
