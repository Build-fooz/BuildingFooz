import React from 'react';
import './BenefitsSection.css';

const BenefitsSection = () => {
  return (
    <>
<div className="benefits-section">
      <div className="benefit">
        <div className="icon">
          <img src="../.././../public/guarantee.png" alt="100% Satisfaction" />
        </div>
        <div className="text">
          <h3>100% Satisfaction</h3>
          <p>Try it to love it!</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="benefit">
        <div className="icon">
          <img src="../.././../public/customer-review.png" alt="100% Genuine Products" />
        </div>
        <div className="text">
          <h3>100% Genuine Products</h3>
          <p>Guaranteed quality!</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="benefit">
        <div className="icon">
          <img src="../.././../public/offer.png" alt="Membership Discounts" />
        </div>
        <div className="text">
          <h3>Membership Discounts</h3>
          <p>Join "ZING" and get 40% off</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="benefit">
        <div className="icon">
          <img src="../.././../public/free-delivery.png" alt="Free Shipping" />
        </div>
        <div className="text">
          <h3>Free Shipping</h3>
          <p>On Order Above Rs 249/-</p>
        </div>
      </div>
    </div>

      <div className="company-description">
        <p>
          Fooz is a food company and brand that believes in the innovation of delivering food products in its fresh form which is possible by creating a zone of fresh foods. They started their food journey with a wide range of Indian and exotic spices. Raw materials are being procured from various parts of the country in order to give an authentic touch to all spices.
        </p>
        <p>
          They are the only player in the spices industries who are grinding spices at a very low temperature using cool grinding technology which is a fully mechanized automated production plant, maintaining the purity, oil, aroma, pungency of the products.
        </p>
        <p>
          For delivering spices in the purest form possible after grinding and thus retaining all the properties of spices until it is consumed, they have introduced the "Zip Lock Packaging" with 4 Layer of spices that keeps the spices fresh and resists the external temperature. The packets are air-tight and can be resealed to retain the aroma, maintain the freshness of spices. Read more at: <a href="https://yourstory.com/companies/Fooz-food" target="_blank" rel="noopener noreferrer">https://yourstory.com/companies/Fooz-food</a>
        </p>
      </div>
  
    </>
  );
};

export default BenefitsSection;
