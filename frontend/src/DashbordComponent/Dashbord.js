import { useEffect, useReducer, useState } from 'react';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Dashbord.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, purchases: action.payload, loading: false };
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
      return { ...state, wishlists: action.payload, loadingg: false };
    case 'FETCH_FAILED':
      return { ...state, loadingg: false, errorr: action.payload };
    default:
      return state;
  }
};

function Dashbord() {
  const sesname = sessionStorage.getItem('usrname');
  const sessAdmin = sessionStorage.getItem('adminstat');
  const sessEmail = sessionStorage.getItem('usremail');
  const brand = 'Buli-Wear';
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [prdname, setPrdName] = useState('');
  //const [image1, setImage1] = useState('');
  const [link, setLink] = useState('');
  const [link0, setLink1] = useState('');
  const [link1, setLink0] = useState('');
  const [size, setSize] = useState('');
  const [labelsize, setlabelsize] = useState('');
  const [sex, setSex] = useState('');
  const [description, setDescription] = useState('');
  const [oldprice, setOldPrice] = useState('');
  const [price, setPrice] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [open, setOpen] = useState(false);
  const [RMopen, setRMOpen] = useState(false);
  const [NMopen, setNMOpen] = useState(false);
  const [SMopen, setSMOpen] = useState(false);
  const [usrname, setUsrName] = useState('');
  const [email, setEmail] = useState(sessEmail);
  const [password, setPassword] = useState('');
  const [whymessage, setWhymessage] = useState('');

  async function createProduct(event) {
    event.preventDefault();
    const formData = new FormData();
    //const setMessage = '';
    formData.append('name', name);
    formData.append('id', id);
    //formData.append('image', image);
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

    axios
      .post('api/products/create', formData)
      .then((res) => {
        //setMessage(res.json);
      })
      .catch((err) => {
        console.log(err);
      });
    toast.info('Published Succesfully');
    await delay(2000);
  }

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

    axios
      .post('../api/products/update', formData)
      .then((res) => {
        //setMessage(res.json);
      })
      .catch((err) => {
        console.log(err);
      });
    toast.info('Published Succesfully');
    await delay(2000);
  }
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
      window.location.href = '/dashbord';
    }
  }

  async function sendNews(event) {
    event.preventDefault();

    const response = await fetch('/api/users/sendnews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
      }),
    });

    const data = await response.json();
    if (data.status === 'ok') {
      toast.info('Newsletter Sent');
      await delay(2000);
      window.location.href = '/dashbord';
    }
  }

  async function updateProfile(event) {
    event.preventDefault();

    const response = await fetch(`/api/users/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usrname,
        email,
        password,
      }),
    });
    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Profile Updated');
      sessionStorage.setItem('usrname', usrname);
      await delay(2000);
      window.location.href = '/';
    } else {
      toast.info('Error');
    }
  }
  async function deleteProfile(event) {
    event.preventDefault();

    const response = await fetch(`/api/users/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        whymessage,
      }),
    });
    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Profile Deleted');
      await delay(2000);
      sessionStorage.clear('usrname');
      window.location.reload();
    } else {
      toast.info('Check your credentials');
    }
  }

  const [{ loading, error, purchases }, dispatch] = useReducer(reducer, {
    pruchases: [],
    loading: true,
    error: '',
  });

  const [{ loadingg, errorr, wishlists }, dispatchs] = useReducer(reducerr, {
    wishlistes: [],
    loadingg: true,
    errorr: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/bought/${sessEmail}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: err.message });
      }
    };
    fetchData();
  }, [sessEmail, RMopen]);

  useEffect(() => {
    const fetchData = async () => {
      dispatchs({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/wishlist/${sessEmail}`);
        dispatchs({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatchs({ type: 'FETCH_FAILED', payload: err.message });
      }
    };
    fetchData();
  }, [sessEmail, NMopen]);

  const upfileHandler = (event) => {
    setImage(event.target.files);
  };

  if (sesname) {
    if (sessAdmin === 'true') {
      return (
        <div id="main1">
          <br />
          <h1>Admin Dashbord</h1>
          <hr />
          <h4>
            Hi' there <i>{sesname}</i>
            <br />
          </h4>
          <br />
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="hero-button-drop"
          >
            <span>Add Product</span>
          </button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <br />
              <Container className="small-container">
                <Form onSubmit={createProduct} encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      placeholder="Name of product"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="id">
                    <Form.Label>Id of Product</Form.Label>
                    <Form.Control
                      placeholder="itm000"
                      type="text"
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="link">
                    <Form.Label>Refrel link</Form.Label>
                    <Form.Control
                      placeholder="Link of Product"
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="link0">
                    <Form.Label>Refrel link (second)</Form.Label>
                    <Form.Control
                      placeholder="Link of Product"
                      type="text"
                      onChange={(e) => setLink0(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="link1">
                    <Form.Label>Refrel link (third)</Form.Label>
                    <Form.Control
                      placeholder="Link of Product"
                      type="text"
                      onChange={(e) => setLink1(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="size">
                    <Form.Label>Size range on months</Form.Label>
                    <Form.Control
                      placeholder="0 - 6 Months"
                      type="text"
                      onChange={(e) => setSize(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="labelsize">
                    <Form.Label>Label size </Form.Label>
                    <Form.Control
                      placeholder="(S/M/L/XL)"
                      type="text"
                      onChange={(e) => setlabelsize(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="sex">
                    <Form.Label>Ideal for (Boy/Girl)</Form.Label>
                    <Form.Control
                      placeholder="(Boy/Girl/Unisex)"
                      type="text"
                      onChange={(e) => setSex(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      as="textarea"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="oldprice">
                    <Form.Label>Old Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Old price"
                      onChange={(e) => setOldPrice(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      placeholder="Price"
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image of Product</Form.Label>
                    <Form.Control
                      type="file"
                      //__filename="image"
                      onChange={upfileHandler}
                      multiple
                      required
                    />
                  </Form.Group>

                  <br />
                  <div className="mb-3">
                    <button className="hero-button" type="submit">
                      Add
                    </button>
                    <br />
                  </div>
                </Form>
              </Container>
            </div>
          </Collapse>
          <hr />
          <button
            onClick={() => setNMOpen(!NMopen)}
            aria-controls="example-collapse-text"
            aria-expanded={NMopen}
            className="hero-button-drop"
          >
            <span>Update Product</span>
          </button>
          <Collapse in={NMopen}>
            <div id="example-collapse-text">
              <br />
              <Container className="large-container">
                <Form onSubmit={updateProduct} encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="prdname">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setPrdName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="id">
                    <Form.Label>Id of Product</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="link">
                    <Form.Label>Refrel link</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="link0">
                    <Form.Label>Refrel link (second)</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setLink0(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="link1">
                    <Form.Label>Refrel link (third)</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setLink1(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="size">
                    <Form.Label>Size range on months</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setSize(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="labelsize">
                    <Form.Label>Label size </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setlabelsize(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="sex">
                    <Form.Label>Ideal for (Boy/Girl)</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setSex(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="oldprice">
                    <Form.Label>Old Price</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(e) => setOldPrice(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
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
          <hr />
          <button
            onClick={() => setRMOpen(!RMopen)}
            aria-controls="example-collapse-text"
            aria-expanded={RMopen}
            className="hero-button-drop"
          >
            <span>Remove Product</span>
          </button>
          <Collapse in={RMopen}>
            <div id="example-collapse-text">
              <br />
              <Container className="large-container">
                <Form onSubmit={removeProduct} encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="id">
                    <Form.Label>Insert Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br />
                  <div className="mb-3">
                    <button className="hero-button" type="submit">
                      Remove
                    </button>
                    <br />
                  </div>
                </Form>
              </Container>
            </div>
          </Collapse>
          <hr />
          <button
            onClick={() => setSMOpen(!SMopen)}
            aria-controls="example-collapse-text"
            aria-expanded={SMopen}
            className="hero-button-drop"
          >
            <span>Send Message</span>
          </button>
          <Collapse in={SMopen}>
            <div id="example-collapse-text">
              <br />
              <Container className="small-container">
                <Form onSubmit={sendNews} encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Write Message</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br />
                  <div className="mb-3">
                    <button className="hero-button" type="submit">
                      Send
                    </button>
                    <br />
                  </div>
                </Form>
              </Container>
            </div>
          </Collapse>
          <br />
          <hr />
          <br />
          <br />
        </div>
      );
    } else {
      return (
        <div id="main1">
          <br />
          <h1>Dashbord </h1>
          <hr />
          <p>
            <h4>
              Hi' there <i>{sesname}</i>
              <br />
            </h4>
            <br />
            <br />
          </p>
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="hero-button-drop"
          >
            <span>Update profile</span>
          </button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <br />
              <Container className="large-container">
                <Form onSubmit={updateProfile}>
                  <Form.Group className="mb-3" controlId="usrname">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsrName(e.target.value)}
                      placeholder={sesname}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={sessEmail}
                      readOnly
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      autoComplete="on"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="mb-3">
                    <button className="hero-button" type="submit">
                      Update
                    </button>
                  </div>
                </Form>
              </Container>
            </div>
          </Collapse>
          <br />
          <p>
            <hr />
            <div>
              <button
                onClick={() => setNMOpen(!NMopen)}
                aria-controls="example-collapse-text"
                aria-expanded={NMopen}
                className="hero-button-drop"
              >
                <span>View Wishlist</span>
              </button>
              <Collapse in={NMopen}>
                <div id="example-collapse-text">
                  <Container className="large-container">
                    <br />
                    {loadingg ? (
                      <div>Please Wait...</div>
                    ) : errorr ? (
                      <div>{errorr}</div>
                    ) : (
                      wishlists.map((items) => (
                        <Row
                          key={items.item_id}
                          sm={12}
                          md={12}
                          lg={12}
                          className="w-100"
                        >
                          <Col sm={4} md={4} lg={4} className="w-25">
                            <Card>
                              <Link to={`/productdetails/${items.item_id}`}>
                                <img
                                  src={items.image}
                                  className="card-img-top"
                                  alt={items.item_name}
                                  height="150px"
                                  width="10px"
                                />
                              </Link>
                            </Card>
                          </Col>

                          <Col sm={5} md={5} lg={8} className="w-75">
                            <Card>
                              <Card.Body>
                                <p>
                                  <Link to={`/productdetails/${items.item_id}`}>
                                    <b>{items.item_name}</b>
                                  </Link>
                                </p>
                                <br />
                                <Card.Subtitle>
                                  {` Date - ${items.createdAt.slice(0, 10)}`}
                                </Card.Subtitle>
                                <br />
                                <Card.Subtitle>
                                  {`Time - ${items.createdAt.slice(11, 19)}`}
                                </Card.Subtitle>
                              </Card.Body>
                            </Card>
                            <br />
                          </Col>
                        </Row>
                      ))
                    )}
                    <br />
                  </Container>
                </div>
              </Collapse>
              <hr />
            </div>
            <div>
              <button
                onClick={() => setRMOpen(!RMopen)}
                aria-controls="example-collapse-text"
                aria-expanded={RMopen}
                className="hero-button-drop"
              >
                <span>View order history</span>
              </button>
              <Collapse in={RMopen}>
                <div id="example-collapse-text">
                  <Container className="large-container">
                    <br />
                    {loading ? (
                      <div>Please Wait...</div>
                    ) : error ? (
                      <div>{error}</div>
                    ) : (
                      purchases.map((items) => (
                        <Row
                          key={items.item_id}
                          sm={12}
                          md={12}
                          lg={12}
                          className="w-100"
                        >
                          <Col sm={4} md={4} lg={4} className="w-25">
                            <Card>
                              <Link to={`/productdetails/${items.item_id}`}>
                                <img
                                  src={items.image}
                                  className="card-img-top"
                                  alt={items.item_name}
                                  height="150px"
                                  width="10px"
                                />
                              </Link>
                            </Card>
                          </Col>

                          <Col sm={5} md={5} lg={8} className="w-75">
                            <Card>
                              <Card.Body>
                                <p>
                                  <Link to={`/productdetails/${items.item_id}`}>
                                    <b>{items.item_name}</b>
                                  </Link>
                                </p>
                                <br />
                                <Card.Subtitle>
                                  {` Date - ${items.createdAt.slice(0, 10)}`}
                                </Card.Subtitle>
                                <br />
                                <Card.Subtitle>
                                  {`Time - ${items.createdAt.slice(11, 19)}`}
                                </Card.Subtitle>
                              </Card.Body>
                            </Card>
                            <br />
                          </Col>
                        </Row>
                      ))
                    )}
                    <br />
                  </Container>
                </div>
              </Collapse>
            </div>
          </p>
          <p>
            <hr />

            <div>
              <button
                onClick={() => setSMOpen(!SMopen)}
                aria-controls="example-collapse-text"
                aria-expanded={SMopen}
                className="hero-button-drop"
              >
                <span>Delete Account</span>
              </button>
              <Collapse in={SMopen}>
                <div id="example-collapse-text">
                  <br />
                  <Container className="large-container">
                    <Form
                      onSubmit={deleteProfile}
                      encType="multipart/form-data"
                    >
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={sessEmail}
                          readOnly
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          autoComplete="on"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="whymessage">
                        <Form.Label>Why you are leaving</Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          onChange={(e) => setWhymessage(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <br />
                      <div className="mb-3">
                        <button className="hero-button" type="submit">
                          Delete
                        </button>
                        <br />
                      </div>
                    </Form>
                  </Container>
                </div>
              </Collapse>
              <hr />
              <br />
            </div>
            <br />
            <br />
          </p>
        </div>
      );
    }
  } else {
    return (window.location.href = '/');
  }
}

export default Dashbord;
