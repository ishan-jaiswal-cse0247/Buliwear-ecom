import './Main2.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, images: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Main2() {
  const [{ loading, error, images }, dispatch] = useReducer(reducer, {
    images: [],
    loading: true,
    error: '',
  });
  //const [products, setproducts] = useState([]);
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

  return (
    <div id="main2">
      <hr />
      <div className="Slider">
        {loading ? (
          <div>Please Wait...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Carousel variant="dark">
            {images.map((imagess) => (
              <Carousel.Item interval={1500}>
                <img
                  className="d-block "
                  id="slide-img"
                  src={imagess}
                  alt="img"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
      <hr />
    </div>
  );
}
export default Main2;
