// client/src/components/ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', {
        name, description, price, image
      });
      alert("Product added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="container product-form">
      <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
           <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
           <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
           <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
           <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
           <button type="submit">Add Product</button>
        </form>
    </div>
  );
}

export default ProductForm;
