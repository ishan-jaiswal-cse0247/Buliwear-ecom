import './ForgotPass.css';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function ForgotPass() {
  const sesname = sessionStorage.getItem('usrname');
  const params = useParams();
  const { emlid } = params;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function resetEmail(event) {
    event.preventDefault();

    const response = await fetch(`/api/users/reseteml`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Email Sent');
      //await delay(2000);
      //window.location.href = '/login';
    } else {
      toast.info('Email sent (if exist)');
    }
  }

  async function resetPass(event) {
    event.preventDefault();

    const response = await fetch(`/api/users/resetpass/${emlid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //email,
        password,
      }),
    });
    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Profile Updated');
      await delay(4000);
      window.location.href = '/login';
    } else {
      toast.info('Error');
    }
  }

  if (sesname) {
    window.location.href = '/';
  } else if (emlid) {
    return (
      <div id="main1">
        <br />
        <h1>Reset Password</h1>
        <hr />
        <Row key={1} sm={2} md={2} lg={2} className="mb-3">
          <Col>
            <img
              src="../assets/media/forgot.png"
              height="300px"
              width="300px"
              alt="BW"
            />
          </Col>
          <Col>
            <Container className="large-container">
              <Form onSubmit={resetPass}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={emlid}
                    readOnly
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="on"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="mb-3">
                  <button className="hero-button" type="submit">
                    Reset
                  </button>
                </div>
                <div className="mb-3">
                  Back to login? {''}
                  <Link to={'/login'}>Login now </Link>
                </div>
              </Form>
            </Container>
          </Col>
        </Row>
      </div>
    );
  } else
    return (
      <div id="main1">
        <br />
        <h1>Reset Password</h1>
        <hr />
        <Row key={1} sm={2} md={2} lg={2} className="mb-3">
          <Col>
            <img
              src="../assets/media/forgot.png"
              height="300px"
              width="300px"
              alt="BW"
            />
          </Col>
          <Col>
            <Container className="large-container">
              <Form onSubmit={resetEmail}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <div className="mb-3">
                  <button className="hero-button" type="submit">
                    Send mail
                  </button>
                </div>
                <div className="mb-3">
                  Back to login? {''}
                  <Link to={'/login'}>Login now </Link>
                </div>
              </Form>
            </Container>
          </Col>
        </Row>
      </div>
    );
}

export default ForgotPass;
