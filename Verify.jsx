
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';
import { baseURL } from "../../../utils/constant";
import React, { useState, useEffect } from "react";
import { isLogin, getCookie} from "../../../utils/auth";

// console.log(baseURL);

export default function Verify() {

  const [otp, setOtp] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        navigate("/");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  },[]);

  const bearerToken = getCookie("bearerToken");
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
        Authorization: `Bearer ${bearerToken}`,
    };

    axios.post(`${baseURL}auth/registerOtpVerify`, { otp }, {headers})
    .then((res) => {
     navigate("/account/");
    })
    .catch((err) => {
      setError(err?.response?.data?.message);
      setShowToast(true);
    });
  }; 

  return (
    <>
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <Container>
      <Row>
        <Col lg={4} className='mx-auto'>
          <Col lg={12} className='p-5 border rounded-4 mb-3'>
            <h5 className='mb-5 text-center'>Verify your account</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="OTP" className='border-0 border-bottom rounded-0' name="otp" onChange={(e)=>setOtp(e.target.value)} />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className='rounded-pill'>
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
    </div>
    
    <style jsx global>{`
      .custom-toast {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;
        margin: 20px;
      }
    `}</style>

    <Toast show={showToast} onClose={() => setShowToast(false)} className="custom-toast p-2 border-0 bg-danger text-white">
      <Toast.Body>{error}</Toast.Body>
    </Toast>
    </>
  )
}
