import React from 'react';
import './PromoBanner.css';
import { FaTruck, FaShoppingCart, FaHeadset } from 'react-icons/fa';

const PromoBanner = () => {
  return (
    <div className="promo-banner">
      {/* Top Icons Section */}
      <div className="top-icons">
        <div className="icon-item">
          <FaTruck className="icon" />
          <h4>Global Delivery</h4>
          <p>Direct to Your Kitchen</p>
        </div>
        <div className="divider"></div>
        <div className="icon-item">
          <FaShoppingCart className="icon" />
          <h4>Bulk Ordering</h4>
          <p>Find Our Products Near You</p>
        </div>
        <div className="divider"></div>
        <div className="icon-item">
          <FaHeadset className="icon" />
          <h4>24/7 Support</h4>
          <p>Expert Advice 24/7</p>
        </div>
      </div>

      {/* Banner Section */}
      <div className="main-banner">
        <div className="banner-left">
          {/* <div className="badge">Limited Stock Available</div>
          <h3>Spice Up Your Meals!</h3>
          <h2>Exciting Deals on <span>Premium Spices</span></h2>
          <button className="browse-btn">Browse Collection</button> */}
        </div>
        <div className="banner-right">
          {/* <div className="badge">Special Offer</div>
          <h3>Deal of the Day</h3>
          <h2>50% off <span>Exotic Spice Blends</span></h2>
          <button className="grab-btn">Grab Deal</button> */}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
