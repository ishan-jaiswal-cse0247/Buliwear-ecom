import './Navbar.css';
import { Link } from 'react-router-dom';
function Navbar() {
  const sesname = sessionStorage.getItem('usrname');
  if (sesname) {
    return (
      <div className="hero-image">
        <div className="hero-text">
          <h1>Welcome to Buliwear</h1>
          <p>
            <i>The Baby Comfort Zone</i>
          </p>
          <br />
          <h3>Greetings {sesname}</h3>
        </div>
      </div>
    );
  } else
    return (
      <div className="hero-image">
        <div className="hero-text">
          <h2>Welcome to BuliWear</h2>
          <p>
            <i>The Baby Comfort Zone</i>
          </p>
          <br />
          <Link to="/login">
            <button className="hero-button">Sign In</button>
          </Link>
        </div>
      </div>
    );
}

export default Navbar;
