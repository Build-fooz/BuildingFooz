// client/src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle product deletion
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle product editing
  const startEditing = (product) => {
    setEditingProduct(product);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  const saveProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${updatedProduct._id}`, updatedProduct);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Update form fields within the ProductList component
  const handleEditChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container product-list">
      <h1>Product List</h1>
      {products.map((product) => (
        <div key={product._id} className="product-item">
          {editingProduct && editingProduct._id === product._id ? (
            // Render edit form if product is being edited
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleEditChange}
                placeholder="Product Name"
              />
              <textarea
                name="description"
                value={editingProduct.description}
                onChange={handleEditChange}
                placeholder="Description"
              />
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleEditChange}
                placeholder="Price"
              />
              <input
                type="text"
                name="image"
                value={editingProduct.image}
                onChange={handleEditChange}
                placeholder="Image URL"
              />
              <button onClick={() => saveProduct(editingProduct)}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </div>
          ) : (
            // Render product details if not editing
            <>
              {product.image && (
                <img src={product.image} alt={product.name} className="product-image" />
              )}
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
              <button onClick={() => startEditing(product)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductList;

 /* useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container product-list">
      <h1>Product List</h1>
      {products.map(product => (
        <div key={product._id} className="product-item">
            {product.image && (
            <img src={product.image} alt={product.name} className="product-image" />
             )}
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>${product.price}</strong></p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;*/
