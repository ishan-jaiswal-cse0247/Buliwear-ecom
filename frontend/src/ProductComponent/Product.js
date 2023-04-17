import { useEffect, useReducer } from 'react';
import axios from 'axios';
import './Product.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Product() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  //const [products, setproducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: err.message });
      }
      //setproducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className="products">
      <br />
      <h1>Products</h1>
      <hr />
      <br />
      {loading ? (
        <div>Please Wait...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={5} md={4} lg={3} className="mb-3">
              <Card>
                <br />
                <br />
                <Link to={`/productdetails/${product.id}`}>
                  <img
                    src={product.image[0]}
                    className="card-img-top"
                    alt={product.name}
                    height="auto"
                  />
                </Link>
                <Card.Body>
                  <div className="prodetail">
                    <p>
                      <i>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {product.brand}
                      </i>
                    </p>

                    <Card.Title>
                      <Link to={`/productdetails/${product.id}`}>
                        <b>{product.name}</b>
                      </Link>
                    </Card.Title>
                    <br />
                    <p>
                      <sup>
                        <i id="cutit">&#8377;{product.oldprice}</i>
                      </sup>
                      &nbsp;&nbsp;
                      <b>&#8377;{product.price}</b>&nbsp;M.R.P only
                    </p>
                    <button className="hero-button">
                      <Link to={`/productdetails/${product.id}`}>Details</Link>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div>
        <br />
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;More products comming soon...</h3>
        <br />
        <br />
      </div>
    </div>
  );
}
export default Product;
