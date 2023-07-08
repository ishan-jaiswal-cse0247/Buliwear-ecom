import './Navbar.css';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

function Navbar() {
  const sesname = sessionStorage.getItem('usrname');

  if (sesname) {
    return (
      <div className="hero-image">
        <div className="hero-text">
          <br />
          <h4>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`<i>Greetings ${sesname}</i>`)
                  .pauseFor(2000)
                  .deleteAll()
                  .typeString('<i>Explore our Primium Quality Products now</i>')
                  .start();
              }}
            />
          </h4>
          <br />
          <Link to="/product">
            <button className="hero-button">Shop Now</button>
          </Link>
        </div>
      </div>
    );
  } else
    return (
      <div className="hero-image">
        <div className="hero-text">
          <br />
          <h4>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`<i>Welcome to Buliwear</i>`)
                  .pauseFor(2000)
                  .deleteAll()
                  .typeString(
                    '<i>Sign In to get access to all of our Products</i>'
                  )
                  .start();
              }}
            />
          </h4>
          <br />
          <Link to="/login">
            <button className="hero-button">Sign In</button>
          </Link>
        </div>
      </div>
    );
}

export default Navbar;
