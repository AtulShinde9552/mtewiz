import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { Link, useNavigate  } from 'react-router-dom';
import { baseURL } from "../../utils/constant";
import React, { useState, useEffect } from "react";
import { isLogin, setAuthentication, getCookie} from "../../utils/auth";
import axios from 'axios';

// console.log(baseURL);

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        navigate("/");
      } else {
        // setPageReady(true);
      }
    };
    authenticate();
  },[]);

  const bearerToken = getCookie("bearerToken");
  const headers = {
    Authorization: `Bearer ${bearerToken}`,
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axios.post(`${baseURL}auth/login`, payload)
    .then((res) => {
      setAuthentication(res.data.bearerToken)
      localStorage.setItem('token', res.data.bearerToken);
      navigate("/account/dashboard");
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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email Address" className='border-0 border-bottom rounded-0' name="email" onChange={(e)=>setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control type="password" placeholder="Password" className='border-0 border-bottom rounded-0' name="password" onChange={(e)=>setPassword(e.target.value)} />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className='rounded-pill'>
                  Log in
                </Button>
              </div>
            </Form>
          </Col>
          <div className='text-center'>
          <Link to='/' className='text-center text-decoration-none'>Back to Home Page</Link>
          </div>
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
