import './Header.css';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  const name = sessionStorage.getItem('usrname');
  function Claearvar() {
    //localStorage.clear('usrname');
    sessionStorage.clear('usrname');
    window.location.reload();
    //refresh="true"
  }
  if (name) {
    localStorage.setItem('usrname', name);
    return (
      <div id="header">
        <Navbar
          collapseOnSelect
          className="navbar"
          fixed="top"
          expand="md"
          bg="black"
          variant="dark"
        >
          <Container fluid>
            <Navbar.Brand id="brand">
              <LinkContainer to="/">
                <img
                  src="../assets/media/nobg_panda.png"
                  height="35px"
                  width="30px"
                  alt=" "
                  className="d-inline-block align-text-top"
                />
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="navbuttons">
              <Nav className="me-auto">
                <Nav.Link eventKey="2" to="/product" as={Link}>
                  Products
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link eventKey="2" to="/about" as={Link}>
                  About
                </Nav.Link>
              </Nav>

              <Nav className="me-auto">
                <Nav.Link eventKey="2" to="/contact" as={Link}>
                  Contact
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link eventKey="2" to="/dashbord" as={Link}>
                  {name}
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link
                  id="glowbutton"
                  eventKey="2"
                  to={'/'}
                  onClick={Claearvar}
                  refresh="true"
                  as={Link}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  } else
    return (
      <div id="header">
        <Navbar
          collapseOnSelect
          className="navbar"
          fixed="top"
          expand="md"
          bg="black"
          variant="dark"
        >
          <Container fluid>
            <Navbar.Brand id="brand">
              <LinkContainer to="/" className="brand">
                <img
                  src="./assets/media/nobg_panda.png"
                  height="35px"
                  width="30px"
                  alt="BW"
                  className="d-inline-block align-text-top"
                />
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="navbuttons">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/product" eventKey="2">
                  Products
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link eventKey="2" as={Link} to="/about">
                  About
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link eventKey="2" as={Link} to="/contact">
                  Contact
                </Nav.Link>
              </Nav>

              <Nav className="me-auto">
                <Nav.Link eventKey="2" as={Link} to="/login">
                  Sign In
                </Nav.Link>

                <Nav.Link eventKey="2" to="/register" as={Link} id="glowbutton">
                  Sign Up
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default Header;
