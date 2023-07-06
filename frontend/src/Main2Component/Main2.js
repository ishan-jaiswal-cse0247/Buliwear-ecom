import './Main2.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Main2() {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products/adimg');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: err.message });
      }
      //setproducts(result.data);
    };
    fetchData();
  }, []);
  //console.log(product);
  return (
    <div id="main2">
      <hr />
      {loading ? (
        <div>Please Wait...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="Slider">
          <Carousel variant="dark">
            {product.image.map((imagess) => (
              <Carousel.Item interval={1500}>
                <Link to={`/productdetails/${product.id}`}>
                  <img
                    className="d-block "
                    id="slide-img"
                    src={imagess}
                    alt="img"
                  />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
      <hr />
    </div>
  );
}
export default Main2;
