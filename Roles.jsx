import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getCookie } from "../../../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../utils/constant";
import Sidebar from "../../../Components/Sidebar/Sidebar";
// import AccountNav from "../../../components/accountNav";
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

const Campaigns = () => {
    const [CampainData, setCampainData] = useState();
    const bearerToken = getCookie("bearerToken");
    const headers = {
        Authorization: `Bearer ${bearerToken}`,
    };
    
    const payload = {
        page: "1",
        start: "0",
        length: '',
        columns: [
        {
            data: "campaignName",
            name: "",
            searchable: true,
            orderable: true,
            search: {
            value: "",
            regex: false,
            },
        },
        {
            data: "recordCount",
            name: "",
            searchable: true,
            orderable: true,
            search: {
            value: "",
            regex: false,
            },
        },
        {
            data: "status",
            name: "",
            searchable: true,
            orderable: true,
            search: {
            value: "",
            regex: false,
            },
        },
        ],
        order: [
        {
            column: 0,
            dir: "asc",
        },
        ],
        search: {
        value: "",
        regex: false,
        },
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
        axios
            .post(`${baseURL}role/getDataTableForRoleList`,
            payload,
            {
                headers: { ...headers },
            }
            )
            .then((response) => {
            const Response = response.data;
            setCampainData(Response);
            setIsLoading(false);
            // console.log(response);
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
      <Container fluid>
        <Row>
            <Sidebar />
            <Col lg={10} className='p-4'>
                <h5 className='mb-3'>Roles</h5>
                {isLoading ? ( // Render Spinner while loading
                            <div className='d-flex justify-content-center align-items-center pt-5'>
                                <Spinner animation="grow" variant="warning" />
                            </div>
                        ) : (
                <Row>
                    <Col lg={12} className='border rounded-4 py-3'>
                        <Table responsive className='table-hover' size='lg'>
                            <thead>
                                <tr>
                                <th></th>
                                <th>Name</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {CampainData &&
                          CampainData.data &&
                          CampainData.data.map((item, index) => (
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.roleName}</td>
                              <td>
                                <Link to="/account/campaigns/view" className='mb-3 text-decoration-none'>
                                    <Button variant="warning" size="sm" className='rounded-3 me-2'><Icon.EyeFill className='' /></Button>
                                    <Button variant="info" size="sm" className='rounded-3'><Icon.PencilFill className='' /></Button> 
                                </Link>
                              </td>
                            </tr>
                          ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                )}
            </Col>
        </Row>
      </Container>
    </>
  );
};

export default Campaigns;
