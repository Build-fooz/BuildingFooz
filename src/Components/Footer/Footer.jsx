
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-logo">FOOZ<span className="footer-tagline">Flovour Of Organic Zest</span></h2>
          <p className="footer-delivery-text">
            We deliver spices at their best form in flavour and nutrients!
          </p>
          <div className="newsletter">
            <p>Subscribe to our newsletter</p>
            <form className="newsletter-form">
              <input type="email" placeholder="email@example.com" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <address className="footer-address">
            Asquare Food & Beverages Pvt Ltd Urla<br />
            Industrial Area, Ring Rd Number 2, Gondwara,<br />
            Raipur, Chhattisgarh 493221.<br />
            95848 22000 | <a href="mailto:hello@FOOZfoods.com">hello@FOOZfoods.com</a>
          </address>
          <div className="social-icons">
            <p>Follow Us:</p>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        <div className="footer-center">
          <h3>Shop Now</h3>
          <ul>
            <li>Shop All</li>
            <li>Veg Spices</li>
            <li>Non Veg Spices</li>
            <li>Pure Spices</li>
            <li>Whole Spices</li>
            <li>Dry fruits</li>
            <li>Seasonings</li>
            <li>Immunity Booster</li>
            <li>Combo Packs</li>
          </ul>
        </div>

        <div className="footer-center">
          <h3>Links</h3>
          <ul>
            <li>Know Our Company</li>
            <li>Meet Our Founders</li>
            <li>Become a partner</li>
            <li>Recipes</li>
          </ul>
        </div>

        <div className="footer-center">
          <h3>Other</h3>
          <ul>
            <li>Reviews</li>
            <li>Blog</li>
            <li>FOOZ TV</li>
            <li>Track your order</li>
          </ul>
          <div className="availability">
            <h4>Also available on</h4>
            <div className="store-logos">
              <img src="../.././../public/amazon-logo-squid-ink-smile-orange.png" alt="Amazon" />
              <img src="../.././../public/Flipkart_(3).png" alt="Flipkart" />
              <img src="../.././../public/JioMart_idTF9pKgr2_0.png" alt="JioMart" />
              <img src="../.././../public/cred.jpeg" alt="CRED" />
              <img src="../.././../public/bigbasket.png" alt="BigBasket" />
              <img src="../.././../public/Zepto_Logo.svg" alt="Zepto" />
            </div>
          </div>
        </div>

        <div className="footer-right">
          <img className="promo-image" src="../.././../public/Footer_Img-removebg-preview.png" alt="Promo" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>© FOOZ Foods Pvt. Ltd. <span>Privacy Policy | Returns and Refund | Quality Assurance</span> Designed & Developed by <strong>Droot</strong></p>
        <p className="shipping-text">Free shipping for orders over <span className="highlight-price">₹249</span></p>
      </div>
    </footer>
  );
};

export default Footer;
