
import './PartnerSection.css';

const PartnerSection = () => {
  return (
    <section className="partner-section">
      <h2 className="partner-title">Become a Partner</h2>
      <div className="partner-grid">
        <div className="partner-card">
          <img src="../.././../public/supplier.png" alt="Suppliers" className="partner-image" />
          <h3 className="partner-name">Suppliers</h3>
          <button className="partner-button">Enquire Now</button>
        </div>

        <div className="partner-card">
          <img src="../.././../public/distribution.png" alt="Distributions" className="partner-image" />
          <h3 className="partner-name">Distributions</h3>
          <button className="partner-button">Enquire Now</button>
        </div>

        <div className="partner-card">
          <img src="../.././../public/promotion.png" alt="Careers" className="partner-image" />
          <h3 className="partner-name">Careers</h3>
          <button className="partner-button">Apply Now</button>
        </div>

        <div className="partner-card">
          <img src="../.././../public/influencer.png" alt="Influencers" className="partner-image" />
          <h3 className="partner-name">Influencers</h3>
          <button className="partner-button">Enquire Now</button>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
