import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { RWebShare } from 'react-web-share';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const COLORS = ['#000000', '#808080'];

const sessAdmin = sessionStorage.getItem('adminstat');
const name = sessionStorage.getItem('usrname');
const sessEmail = sessionStorage.getItem('usremail');

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

const reducerr = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loadingg: true };
    case 'FETCH_SUCCESS':
      return { ...state, chartdata: action.payload, loadingg: false };
    case 'FETCH_FAILED':
      return { ...state, loadingg: false, errorr: action.payload };
    default:
      return state;
  }
};

function ProductDetails() {
  const params = useParams();
  const { id } = params;
  const [open, setOpen] = useState(false);
  const [RMopen, setRMOpen] = useState(false);
  const [NMopen, setNMOpen] = useState(false);
  const brand = 'Buliwear';
  const [prdname, setPrdName] = useState('');
  const [setId] = useState(id);
  const [image, setImage] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [link, setLink] = useState('');
  const [link0, setLink1] = useState('');
  const [link1, setLink0] = useState('');
  const [size, setSize] = useState('');
  const [labelsize, setlabelsize] = useState('');
  const [sex, setSex] = useState('');
  const [description, setDescription] = useState('');
  const [oldprice, setOldPrice] = useState('');
  const [price, setPrice] = useState('');
  const [inWishlist, setinWishlist] = useState(false);
  const [wishimg, setWishimg] = useState();

  async function updateProduct(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('prdname', prdname);
    formData.append('id', id);
    for (let i = 0; i < image.length; i++) {
      formData.append(`image`, image[i]);
    }
    formData.append('brand', brand);
    formData.append('link', link);
    formData.append('link0', link0);
    formData.append('link1', link1);
    formData.append('size', size);
    formData.append('labelsize', labelsize);
    formData.append('sex', sex);
    formData.append('description', description);
    formData.append('oldprice', oldprice);
    formData.append('price', price);

    await axios
      .post('/api/products/update', formData)
      .then((res) => {
        //setMessage(res.json);
      })
      .catch((err) => {
        //console.log(err);
      });
    toast.info('Updated Succesfully');
    await delay(7000);
    window.location.href = '/';
  }
  const upfileHandler = (event) => {
    setImage(event.target.files);
  };

  async function removeProduct(event) {
    event.preventDefault();

    const response = await fetch('/api/products/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Deleted Succesfully');
      await delay(2000);
      window.location.href = '/';
    }
  }
  async function wishlistProduct() {
    const response = await fetch(`/api/wishlist/create/${sessEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Added to wishlist');
      setinWishlist(true);
      setWishimg('../assets/media/heartfill.png');
    }
  }

  async function unwishlistProduct() {
    const response = await fetch(`/api/wishlist/delete/${sessEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Deleted from wishlist');

      setinWishlist(false);
      setWishimg('../assets/media/heartunfill.png');
    }
  }
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  const [{ loadingg, errorr, chartdata }, dispatchs] = useReducer(reducerr, {
    chartdata: [],
    loadingg: true,
    errorr: '',
  });

  useEffect(() => {
    async function checkinwish() {
      const response = await fetch(`/api/wishlist/checkinwish/${sessEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();

      if (data === true) {
        setinWishlist(true);
        setWishimg('../assets/media/heartfill.png');
      } else if (data === false) {
        setinWishlist(false);
        setWishimg('../assets/media/heartunfill.png');
      }
    }

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/id/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: err.message });
      }
      checkinwish();
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      dispatchs({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/chartdata/${id}`);
        dispatchs({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatchs({ type: 'FETCH_FAILED', payload: err.message });
      }
    };
    fetchData();
  }, [id, open]);

  function handleWish() {
    if (inWishlist) {
      unwishlistProduct();
      setinWishlist(false);
      setWishimg('../assets/media/heartunfill.png');
    } else {
      wishlistProduct();
      setinWishlist(true);
      setWishimg('../assets/media/heartfill.png');
    }
  }

  if (name && sessAdmin === 'false') {
    return loading ? (
      <div>
        <br />
        <h1>Details </h1>
        <hr />
        <br />
        <Row key={0} sm={1} md={1} lg={2} className="mb-3">
          <Col>
            <Card>
              <Skeleton height={320} width={660} />
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Skeleton height={400} width={600} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Container>
            <Skeleton height={40} />
          </Container>
        </Row>
      </div>
    ) : error ? (
      <div>
        <br />
        <h4>product id = {id} not found</h4>
      </div>
    ) : (
      <div>
        <br />
        <h1>Details </h1>
        <hr />
        <br />
        <Row key={1} sm={1} md={1} lg={2} className="mb-3">
          <Col>
            <Card>
              <br />
              <div className="wi_shbtn">
                <button onClick={handleWish} className="wishbtn">
                  <img src={wishimg} alt="wish" height="27px" width="27px" />
                </button>
                <RWebShare
                  data={{
                    text: 'Share',
                    url: `https://fluffy-teal-giraffe.cyclic.app/productdetails/${product.id}`,
                    title: 'Share Buliwear product',
                  }}
                >
                  <button className="shbtn">
                    <img
                      src="../assets/media/share.png"
                      alt="share"
                      height="27px"
                      width="27px"
                    />
                  </button>
                </RWebShare>
              </div>
              <Link to={`/productdetails/${product.id}`}>
                <div className="Slider">
                  <Carousel variant="dark">
                    {product.image.map((imagess) => (
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
                </div>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <div className="prodetail">
                  <p>
                    <i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                    <strong>Size:</strong> &nbsp;&nbsp;{product.size}
                  </p>

                  <p>
                    <strong>Sex:</strong> &nbsp;&nbsp;{product.sex}
                  </p>

                  <p>
                    <strong>Label Size:</strong> &nbsp;&nbsp;
                    {product.labelsize}
                  </p>

                  <p>
                    <sup>
                      <i id="cutit">&#8377;{product.oldprice}</i>
                    </sup>
                    &nbsp;&nbsp;
                    <b>&#8377;{product.price}</b>&nbsp;M.R.P only
                  </p>

                  <button
                    onClick={() => setRMOpen(!RMopen)}
                    aria-controls="example-collapse-text"
                    aria-expanded={RMopen}
                    className="hero-button-drop"
                  >
                    <span>Other links</span>
                  </button>
                  <br />
                  <Collapse in={RMopen}>
                    <div id="view-desc">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>Amazon</b>
                      </a>
                      <br />
                      <a
                        href={product.link0}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>Flipkart</b>
                      </a>
                      <br />
                      <a
                        href={product.link1}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>Meesho</b>
                      </a>
                    </div>
                  </Collapse>
                  <br />
                  <button className="hero-button">
                    <Link to={`/buyproduct/${product.id}`} className="nav-link">
                      Buy now
                    </Link>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Container>
            <button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="hero-button-drop"
            >
              <span>View Description</span>
            </button>
            <Collapse in={open}>
              <div id="view-desc">{product.description}</div>
            </Collapse>
          </Container>
        </Row>
      </div>
    );
  } else if (name && sessAdmin === 'true') {
    return loading ? (
      <div>
        <br />
        <h1>Details </h1>
        <hr />
        <br />
        <Row key={0} sm={1} md={1} lg={2} className="mb-3">
          <Col>
            <Card>
              <Skeleton height={320} width={660} />
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Skeleton height={400} width={600} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Container>
            <Skeleton height={40} />
          </Container>
        </Row>
      </div>
    ) : error ? (
      <div>
        <br />
        <h4>product id = {id} not found</h4>
      </div>
    ) : (
      <div>
        <br />
        <h1>Details</h1>
        <hr />
        <br />
        <Row key={1} sm={1} md={1} lg={2} className="mb-3">
          <Col>
            <Card>
              <br />
              <br />
              <Link to={`/productdetails/${product.id}`}>
                <div className="Slider">
                  <Carousel variant="dark">
                    {product.image.map((imagess) => (
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
                </div>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <div className="prodetail">
                  <p>
                    <i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                    <strong>Size:</strong> &nbsp;&nbsp;{product.size}
                  </p>

                  <p>
                    <strong>Sex:</strong> &nbsp;&nbsp;{product.sex}
                  </p>

                  <p>
                    <strong>Label Size:</strong> &nbsp;&nbsp;
                    {product.labelsize}
                  </p>

                  <p>
                    <sup>
                      <i id="cutit">&#8377;{product.oldprice}</i>
                    </sup>
                    &nbsp;&nbsp;
                    <b>&#8377;{product.price}</b>&nbsp;M.R.P only
                  </p>

                  <button
                    onClick={() => setRMOpen(!RMopen)}
                    aria-controls="example-collapse-text"
                    aria-expanded={RMopen}
                    className="hero-button-drop"
                  >
                    <span>Update Product</span>
                  </button>
                  <Collapse in={RMopen}>
                    <div id="example-collapse-text">
                      <br />
                      <Container className="large-container" id="mid-container">
                        <Form
                          onSubmit={updateProduct}
                          encType="multipart/form-data"
                        >
                          <Form.Group className="mb-3" controlId="prdname">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              placeholder={product.name}
                              type="text"
                              onChange={(e) => setPrdName(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="id">
                            <Form.Label>Id of Product</Form.Label>
                            <Form.Control
                              value={product.id}
                              type="text"
                              onChange={(e) => setId(e.target.value)}
                              required
                              readOnly
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="link">
                            <Form.Label>Refrel link</Form.Label>
                            <Form.Control
                              placeholder={product.link}
                              type="text"
                              onChange={(e) => setLink(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="link0">
                            <Form.Label>Refrel link (second)</Form.Label>
                            <Form.Control
                              placeholder={product.link0}
                              type="text"
                              onChange={(e) => setLink0(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="link1">
                            <Form.Label>Refrel link (third)</Form.Label>
                            <Form.Control
                              placeholder={product.link1}
                              type="text"
                              onChange={(e) => setLink1(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="size">
                            <Form.Label>Size range on months</Form.Label>
                            <Form.Control
                              placeholder={product.size}
                              type="text"
                              onChange={(e) => setSize(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="labelsize">
                            <Form.Label>Label size </Form.Label>
                            <Form.Control
                              placeholder={product.labelsize}
                              type="text"
                              onChange={(e) => setlabelsize(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="sex">
                            <Form.Label>Ideal for (Boy/Girl)</Form.Label>
                            <Form.Control
                              placeholder={product.sex}
                              type="text"
                              onChange={(e) => setSex(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={product.description}
                              as="textarea"
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="oldprice">
                            <Form.Label>Old Price</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder={product.oldprice}
                              onChange={(e) => setOldPrice(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              placeholder={product.price}
                              type="number"
                              onChange={(e) => setPrice(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image of Product</Form.Label>
                            <Form.Control
                              type="file"
                              onChange={upfileHandler}
                              multiple
                              required
                            />
                          </Form.Group>

                          <br />
                          <div className="mb-3">
                            <button className="hero-button" type="submit">
                              Update
                            </button>
                            <br />
                          </div>
                        </Form>
                      </Container>
                    </div>
                  </Collapse>
                </div>
                <br />
                <button
                  onClick={() => setNMOpen(!NMopen)}
                  aria-controls="example-collapse-text"
                  aria-expanded={NMopen}
                  className="hero-button-drop"
                >
                  <span>Remove Product</span>
                </button>
                <Collapse in={NMopen}>
                  <div id="example-collapse-text">
                    <br />
                    <Container className="large-container" id="mid-container">
                      <Form
                        onSubmit={removeProduct}
                        encType="multipart/form-data"
                      >
                        <Form.Group className="mb-3" controlId="id">
                          <Form.Label>This product will be deleted</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setId(e.target.value)}
                            required
                            value={product.id}
                            readOnly
                          />
                        </Form.Group>
                        <br />
                        <div className="mb-3">
                          <button className="hero-button" type="submit">
                            Conform
                          </button>
                          <br />
                        </div>
                      </Form>
                    </Container>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Container>
            <button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="hero-button-drop"
            >
              <span>View details of Product</span>
            </button>
            <Collapse in={open}>
              <div id="view-desc">
                {loadingg ? (
                  <div>Please Wait...</div>
                ) : errorr ? (
                  <div>{errorr}</div>
                ) : (
                  <div className="chartbox">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={chartdata}
                        dataKey="count_data"
                        nameKey="type_data"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={150}
                        fill="grey"
                        label
                      >
                        {chartdata.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </div>
                )}
              </div>
            </Collapse>
          </Container>
        </Row>
      </div>
    );
  } else {
    return loading ? (
      <div>
        <br />
        <h1>Details </h1>
        <hr />
        <br />
        <Row key={0} sm={1} md={1} lg={2} className="mb-3">
          <Col>
            <Card>
              <Skeleton height={320} width={660} />
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Skeleton height={400} width={600} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Container>
            <Skeleton height={40} />
          </Container>
        </Row>
      </div>
    ) : error ? (
      <div>
        <br />
        <h4>product id = {id} not found</h4>
      </div>
    ) : (
      <div>
        <br />
        <h1>Details</h1>
        <hr />
        <br />
        <Row key={1} sm={1} md={1} lg={2} className="mb-3">
          <Col>
            <Card>
              <br />
              <br />
              <Link to={`/productdetails/${product.id}`}>
                <div className="Slider">
                  <Carousel variant="dark">
                    {product.image.map((imagess) => (
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
                </div>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <div className="prodetail">
                  <p>
                    <i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                    <strong>Size:</strong> &nbsp;&nbsp;{product.size}
                  </p>

                  <p>
                    <strong>Sex:</strong> &nbsp;&nbsp;{product.sex}
                  </p>

                  <p>
                    <strong>Label Size:</strong> &nbsp;&nbsp;
                    {product.labelsize}
                  </p>

                  <p>
                    <sup>
                      <i id="cutit">&#8377;{product.oldprice}</i>
                    </sup>
                    &nbsp;&nbsp;
                    <b>&#8377;{product.price}</b>&nbsp;M.R.P only
                  </p>

                  <button className="hero-button">
                    <Link to={'/login'}>Sign In</Link>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Container>
            <button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="hero-button-drop"
            >
              <span>View Description</span>
            </button>
            <Collapse in={open}>
              <div id="view-desc">{product.description}</div>
            </Collapse>
          </Container>
        </Row>
      </div>
    );
  }
}

export default ProductDetails;
