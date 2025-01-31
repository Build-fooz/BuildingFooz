/*const Product = () => {
  return (
    <div>Product</div>
  )
}
export default <Product></Product>// /src/components/Products.jsx*/
import Item from "./Item";  // Make sure path is correct

function Products() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 500,
      image: "https://via.placeholder.com/150",  // Replace with real image URL
    },
    {
      id: 2,
      name: "Product 2",
      price: 300,
      image: "https://via.placeholder.com/150",  // Replace with real image URL
    },
    // Add more products as needed
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
