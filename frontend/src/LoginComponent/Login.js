import './Login.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
//import session from 'express-session';
function Login() {
  //const navigate = useNavigate();
  //const { search } = useLocation();
  //const redirectInUrl = new URLSearchParams(search).get('redirect');
  //const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const data = await response.json();

    if (data.user) {
      localStorage.setItem('token', data.user);

      const user_email = await fetch('/api/users/email', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const name_req = await fetch('/api/users/name', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const isAdmin_req = await fetch('/api/users/isAdmin', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const emaildata = await user_email.json();
      const admindata = await isAdmin_req.json();
      const isAdmin = admindata.isAdmin;
      const usremail = emaildata.usremail;
      const namedata = await name_req.json();
      const fname = namedata.name;
      toast.success(`Welcome ${fname}`);
      sessionStorage.setItem('usrname', fname);
      sessionStorage.setItem('usremail', usremail);
      sessionStorage.setItem('adminstat', isAdmin);

      await delay(2000);
      window.location.href = '/';
    } else {
      toast.error('Please check your username and password');
    }
  }
  const sesname = sessionStorage.getItem('usrname');
  if (sesname) {
    window.location.href = '/';
  }
  return (
    <div id="main1">
      <br />
      <h1>Sign In</h1>
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
            <Form onSubmit={loginUser}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="on"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="mb-3">
                <button className="hero-button" type="submit">
                  Sign In
                </button>
              </div>
              <div className="mb-3">
                New customer? {''}
                <Link to={'/Register'}>Register now </Link>
              </div>
              <div className="mb-3">
                Forgot Password? {''}
                <Link to={'/ForgotPass'}>Reset password</Link>
              </div>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
