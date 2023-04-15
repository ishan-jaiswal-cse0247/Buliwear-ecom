import './Main2.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

function Main2() {
  return (
    <div id="main2">
      <hr />
      <div className="Slider">
        <Carousel variant="dark">
          <Carousel.Item interval={1500}>
            <img
              className="d-block "
              id="slide-img"
              src="../assets/media/Product/5.png"
              alt="One"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              className="d-block "
              id="slide-img"
              src="../assets/media/Product/6.png"
              alt="Two"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              className="d-block "
              id="slide-img"
              src="../assets/media/Product/7.png"
              alt="three"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <hr />
    </div>
  );
}
export default Main2;
