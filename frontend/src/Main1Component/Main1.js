import './Main1.css';
import About from '../AboutComponent/About.js';
import Contact from '../ContactComponent/Contact.js';
import Product from '../ProductComponent/Product.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Main1() {
  return (
    <div id="main1">
      <br />
      <h1>Who we are ?</h1>
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
          <p>
            BuliWear is a one stop for all of your baby needs. It provides you
            The Best in Comfort product for your baby. Here you will get clothes
            and few more products for your baby. As you will become a part of
            our BuliWear family we will make sure to provide you our best
            services and products. And for this we just need your support and
            feedback.
          </p>
          <i>Buy our products and join our Buliwear family now</i>
          <br />
          <br />
          <Link to={'/register'}>
            <button className="hero-button">Join Us</button>
          </Link>
        </Col>
      </Row>
      <br />
      <Row key={1} sm={2} md={2} lg={2} className="mb-3">
        <Col>
          <p>
            Our platform is capable to handle all of our customers needs by
            providing details about our product and services we offer. Also we
            get there some information like Email address by which we can
            contact them and share a news letters with which has details about
            new product and services and future updates. As this is an official
            website our customers did not have to worry about anything before
            Signing In.
          </p>
          <i>
            Sounds intresting, See our large collection of Baby Comforting
            Products
          </i>
          <br />
          <br />
          <Link to={'/product'}>
            <button className="hero-button">View</button>
          </Link>
        </Col>
        <Col>
          <img
            src="../assets/media/home.png"
            height="300px"
            width="300px"
            alt="BW"
          />
        </Col>
      </Row>
      <div className="prd-comp">
        <Product />
      </div>
      <br />
      <Link to={'/product'}>
        <button className="hero-button">View more</button>
      </Link>

      <About />
      <Contact />
    </div>
  );
}

export default Main1;
