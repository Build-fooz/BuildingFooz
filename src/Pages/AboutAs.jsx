import BenefitsSection from "../Components/BenefitsSection/BenefitsSection"
import ContactForm from "../Components/ContactForm/ContactForm"
import Footer from "../Components/Footer/Footer"
import HeroSection from "../Components/HeroSection/HeroSection"


const AboutAs = () => {
  return (
    <div>
      <HeroSection
        imageUrl="../.././../public/certificate.jpg"  // Replace with your image URL
        headline="Welcome to Our Website"
        description="Discover amazing content and experiences right here."
      />
    <BenefitsSection />
    <ContactForm/>
    <Footer/>
    </div>
  )
}
export default AboutAs