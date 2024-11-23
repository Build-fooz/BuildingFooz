// ProductSlider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.css"; // Create this file for custom styles
import bg from "../.././../public/backgroundImage.png"
const products = [
  {
    id: 1,
    name: "Bay leaf",
    price: 25.0,
    weight: "50g",
    image: "../.././../public/Bay leaf.png",
    rating: 4.0,
    reviews: 16,
  },
  {
    id: 2,
    name: "Star anise",
    price: 100.0,
    weight: "50g",
    image: "../.././../public/Star anise.png",
    rating: 4.5,
    reviews: 13,
  },
  {
    id: 3,
    name: "Cloves",
    price: 100.0,
    weight: "100g",
    image: "../.././../public/Cloves.png",
    rating: 4.2,
    reviews: 13,
  },
  {
    id: 4,
    name: "Cinnamon Sticks",
    price: 20.0,
    weight: "50g",
    image: "../.././../public/Cinnamon Sticks.png",
    rating: 4.6,
    reviews: 10,
  },
];

const ProductSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-slider">
    <h2 className='font-bold text-[2.5rem] p-2 m-auto mt-4 mb-2 flex justify-center'>TOP COLLECTIONS</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>₹{product.price.toFixed(2)}</p>
            <p>₹{product.price.toFixed(2)} / {product.weight}</p>
            <div className="rating">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
              <span> {product.rating} ({product.reviews})</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom Arrow Components
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: -25 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: -25 }}
      onClick={onClick}
    />
  );
}

export default ProductSlider;
