import CategoryGrid from "../Components/Categories/CategoryGrid"
import CustomersFav from "../Components/CustomersFav/CustomersFav"
import Hero from "../Components/HeroSection/Hero"
import PromoBanner from "../Components/PromoBanner/PromoBanner"
import ProductSlider from "../Components/Slider/ProductSlider"
import TopCollections from "../Components/TopCollections"

const Home = () => {
  return (
    <div>
      <Hero/>
      <TopCollections/>
      <ProductSlider/>
      <PromoBanner/>
      <CategoryGrid/>
      <CustomersFav/>
    </div>
  )
}
export default Home