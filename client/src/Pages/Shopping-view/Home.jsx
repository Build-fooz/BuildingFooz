/* eslint-disable no-unused-vars */
import ProductSlider from "@/Components/Slider/ProductSlider"
import Hero from "../../Components/HeroSection/Hero"
import TopCollections from "../../Components/shopping-view/TopCollections"
import PromoBanner from "@/Components/PromoBanner/PromoBanner"
import { CartesianGrid } from "recharts"
import CategoryGrid from "../../Components/Categories/CategoryGrid"
import CustomersFav from "../../Components/CustomersFav/CustomersFav"

const Home = () => {
  return (
    <div className="m-[15px]">
      <Hero />
      <TopCollections />
      <ProductSlider />
      <PromoBanner />
      <CategoryGrid />
      <CustomersFav />

    </div>
  )
}
export default Home