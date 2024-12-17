import React, { useState } from "react";
import "./FilterSortComponent.css";

const productsData = [
  { id: 1, name: "Fooz Eucalyptus Globulus Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EsentialOil Id1.jpg" },
  { id: 2, name: "Fooz Lavender Essential Oil", price: 15, availability: "In stock", image: "../.././../public/EssentialOilId2.jpg" },
  { id: 3, name: "Fooz Lemongrass Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EssentialOilId3.jpg" },
  { id: 4, name: "Fooz Lemongrass Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EssentialOilId4.jpg" },
  { id: 5, name: "Fooz Rosemary Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EssentialOilId5.jpg" },
  { id: 6, name: "Fooz Tea Tree Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EssentialOilId6.jpg" },
  { id: 7, name: "Fooz Winter Green Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EssentialOilId7.jpg" },
  { id: 8, name: "Fooz Cinnamon Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EssentialOilId8.jpg" },
  { id: 9, name: "Fooz Cloves Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EssentialOilId9.jpg" },
  { id: 10, name: "Fooz Eucalyptus Citriodora Essential Oil", price: 50, availability: "In stock", image: "../.././../public/EssentialOilId10.jpg" },
];

const FilterSortComponent = () => {
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortValue, setSortValue] = useState("Best selling");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [inStock, setInStock] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const toggleAvailabilityDropdown = () => {
    setAvailabilityOpen(!availabilityOpen);
    setPriceOpen(false);
  };

  const togglePriceDropdown = () => {
    setPriceOpen(!priceOpen);
    setAvailabilityOpen(false);
  };

  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    setSortValue(sortOption);

    let sortedProducts = [...filteredProducts];
    switch (sortOption) {
      case "Price, low to high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price, high to low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Alphabetically, A-Z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetically, Z-A":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  const applyFilters = () => {
    let filtered = productsData;

    if (inStock) {
      filtered = filtered.filter((product) => product.availability === "In stock");
    }

    if (priceRange.min !== "" && priceRange.max !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(priceRange.min) && product.price <= Number(priceRange.max)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="filter-sort-container">
      <div className="filter-section">
        <div className="filter-dropdown">
          <button className="dropdown-button" onClick={toggleAvailabilityDropdown}>
            Availability <span className="arrow">&#9660;</span>
          </button>
          {availabilityOpen && (
            <div className="dropdown-content">
              <p className="dropdown-title">
                0 selected <span className="reset-link" onClick={() => setInStock(false)}>Reset</span>
              </p>
              <label className="checkbox-label">
                <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
                In stock
              </label>
            </div>
          )}
        </div>

        <div className="filter-dropdown">
          <button className="dropdown-button" onClick={togglePriceDropdown}>
            Price <span className="arrow">&#9660;</span>
          </button>
          {priceOpen && (
            <div className="dropdown-content price-dropdown">
              <p className="dropdown-title">
                The highest price is Rs. 260.00 <span className="reset-link" onClick={() => setPriceRange({ min: "", max: "" })}>Reset</span>
              </p>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="₹ From"
                  className="price-input"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="₹ To"
                  className="price-input"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        <button className="apply-button" onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="sort-section">
        <label className="sort-label">Sort by</label>
        <select className="sort-dropdown" value={sortValue} onChange={handleSortChange}>
          <option>Best selling</option>
          <option>Alphabetically, A-Z</option>
          <option>Alphabetically, Z-A</option>
          <option>Price, low to high</option>
          <option>Price, high to low</option>
        </select>
      </div>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">From Rs. {product.price.toFixed(2)}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSortComponent;
