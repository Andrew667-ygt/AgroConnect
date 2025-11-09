import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-4">AgroConnect</h5>
            <p className="text-muted">
              Connecting farmers and buyers across Ghana. Making agricultural trade 
              simple, efficient, and profitable for everyone.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="me-3"><FaFacebook /></a>
              <a href="https://twitter.com" className="me-3"><FaTwitter /></a>
              <a href="https://instagram.com" className="me-3"><FaInstagram /></a>
              <a href="https://wa.me/yourphonenumber"><FaWhatsapp /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-white mb-4">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/register-buyer">Register as Buyer</Link></li>
              <li><Link to="/register-seller">Register as Seller</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white mb-4">Contact Info</h6>
            <ul className="list-unstyled text-muted">
              <li>123 Farm Street, Accra</li>
              <li>Ghana</li>
              <li>Phone: +233 20 100 190</li>
              <li>Email: info@agroconnect.com</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white mb-4">Newsletter</h6>
            <p className="text-muted">Subscribe for updates and news</p>
            <form className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email"
                  aria-label="Your email"
                />
                <button className="btn btn-success" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 text-muted">
                © {currentYear} Heculus AgroConnect. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/terms">Terms of Use</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}