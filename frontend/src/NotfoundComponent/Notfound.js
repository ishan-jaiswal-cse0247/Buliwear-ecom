import './Notfound.css';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Notfound() {
  return (
    <div id="main1">
      <br />
      <h1>Oops, 404</h1>
      <hr />
      <Row key={1} sm={1} md={1} lg={2} className="mb-3">
        <Col>
          <img
            src="../assets/media/forgot.png"
            height="300px"
            width="300px"
            alt="BW"
          />
        </Col>
        <Col>
          <p>
            <h3>Page not found</h3>

            <h6 id="notfounddetail">
              We're sorry the Page you are requesting could not be found, Please
              go back to Home page or Contact us for more details.
            </h6>
          </p>
          <br />
          <Link to={'/register'}>
            <button className="hero-button">Home</button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Notfound;
