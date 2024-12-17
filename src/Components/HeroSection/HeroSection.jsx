
import './HeroSection.css';

const HeroSection = ({ imageUrl, headline, description }) => {
  return (
    <section className="hero-section">
      {/* <div className="hero-content">
        <h1 className="hero-headline">{headline}</h1>
        <p className="hero-description">{description}</p>
      </div> */}
      <div className="hero-image">
        <img src="../.././../public/certificate.jpg" alt="Hero" />
      </div>
    </section>
  );
};

export default HeroSection;
