import './Register.css';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

//import Form from 'react-bootstrap/Form';
function Register() {
  //const history = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Registered Succesfully');
      await delay(4000);
      window.location.href = '/login';

      //history.push('/login');
    }
  }
  const sesname = sessionStorage.getItem('usrname');
  //const sessAdmin = sessionStorage.getItem('adminstat');
  if (sesname) {
    window.location.href = '/';
  }
  return (
    <div id="main1">
      <br />
      <h1>Sign Up</h1>
      <hr />
      <Row key={1} sm={2} md={2} lg={2} className="mb-3">
        <Col>
          <img
            src="../assets/media/logo.png"
            height="300px"
            width="300px"
            alt="BW"
          />
        </Col>
        <Col>
          <Container className="large-container">
            <Form onSubmit={registerUser}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="on"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="mb-3">
                <button className="hero-button" type="submit">
                  Sign Up
                </button>
              </div>
              <div className="mb-3">
                Alredy have an acount? {''}
                <Link to={'/login'}>Login now </Link>
              </div>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
