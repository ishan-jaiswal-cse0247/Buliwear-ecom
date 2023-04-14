import './About.css';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function About() {
  return (
    <div id="main1">
      <br />
      <h1>About</h1>
      <hr />
      <Row key={1} sm={1} md={1} lg={2} className="mb-3">
        <Col>
          <img
            src="../assets/media/about.png"
            height="300px"
            width="300px"
            alt="BW"
          />
        </Col>
        <Col>
          <p>
            BuliWear is a one stop for all of your Baby needs. Buliwear can
            provides you The Best in Comfort product for your baby. Here you
            will get clothes, beds, and many more products for your baby. As you
            will become a part of our Buliwear family we will make sure to
            provide you our best services and products. And for this we need
            your support and feedback about our products and services, which you
            can provide us from our platform and as well as we provide this
            option via whatsapp number which you will get along with all of our
            products.
          </p>
          <i>Buy our products and join our Buliwear family now</i>
          <br />
          <br />
          <Link to={'/register'}>
            <button className="hero-button">Join Us</button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default About;
