import axios from 'axios';
import { baseURL } from "../../utils/constant";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { isLogin, setAuthentication, getCookie} from "../../utils/auth";
import Toast from 'react-bootstrap/Toast';


export default function Page() {

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successError, setsuccessError] = useState();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      companyName,
      jobTitle,
      email,
      password
    };

    axios.post(`${baseURL}auth/register`, payload)
    .then((res) => {
      setAuthentication(res.data.bearerToken)
      localStorage.setItem('bearerToken', res.data.bearerToken);
      navigate("/register/verify");
      // setsuccessError(err?.response?.data?.message);
      setShowSuccessToast(true);
    })
    .catch((err) => {
      setError(err?.response?.data?.message);
      setShowToast(true);
    });
  }; 

  return (
    <>
    <div className='d-flex justify-content-center m-auto align-items-center vh-100'>
    <Container>
      <Row>
        <Col lg={4} className='mx-auto'>
          <Col lg={12} className='p-5 border rounded-4 mb-3'>
            <h5 className='mb-5 text-center'>Create Account</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="First Name" className='border-0 border-bottom rounded-0' name="firstName" onChange={(e)=>setfirstName(e.target.value)}  />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Last Name" className='border-0 border-bottom rounded-0' name="lastName" onChange={(e)=>setlastName(e.target.value)}  />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Company Name" className='border-0 border-bottom rounded-0' name="companyName" onChange={(e)=>setcompanyName(e.target.value)}  />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Job Title" className='border-0 border-bottom rounded-0' name="jobTitle" onChange={(e)=>setjobTitle(e.target.value)}  />
              </Form.Group>
                
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email Address" className='border-0 border-bottom rounded-0' name="email" onChange={(e)=>setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" className='border-0 border-bottom rounded-0' name="password" onChange={(e)=>setPassword(e.target.value)} />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className='rounded-pill'>
                  Register
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

    <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} className="custom-toast p-2 border-0 bg-success text-dark">
      <Toast.Body>{successError}</Toast.Body>
    </Toast>

    </>
  )
}
