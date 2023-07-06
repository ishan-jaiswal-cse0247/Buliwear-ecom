import './Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className="full-footer">
      <footer>
        <div className="footer-content">
          <br />
          <h3>Buli-Wear</h3>
          <p>
            <i>The Baby Comfort Zone</i>
            <br />
            <a href="https://play.google.com/store/apps/details?id=com.ecom.buliwear">
              <img src="../assets/media/playstore.png" alt=" " id="playstore" />
            </a>
          </p>
          <div className="footer-menu">
            <ul className="f-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
            <br />
          </div>
          <p>copyright &copy; 2023 Buliwear. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
