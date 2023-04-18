import './Contact.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function contactUs(event) {
    event.preventDefault();
    const response = await fetch('/api/users/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Thank you for your Feedback');
      await delay(4000);
      window.location.href = '/contact';
    }
  }

  return (
    <div id="main1">
      <br />
      <h1>Contact Us</h1>
      <hr />
      <Row key={1} sm={2} md={2} lg={2} className="mb-3">
        <Col>
          <img
            src="../assets/media/contact.png"
            height="300px"
            width="300px"
            alt="BW"
          />
        </Col>
        <Col>
          <Container className="large-container">
            <Form onSubmit={contactUs}>
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
              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  as="textarea"
                  rows={4}
                />
              </Form.Group>

              <div className="mb-3">
                <button className="hero-button" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
