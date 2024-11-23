import React from 'react';
import './CategoryGrid.css';

const categories = [
  {
    name: 'Whole Spices',
    imgSrc: '../.././../public/WholeSpices.png',
  },
  {
    name: 'Ground Spices',
    imgSrc: '../.././../public/Ground Spices.png',
  },
  {
    name: 'Leaf Spices',
    imgSrc: '../.././../public/Bay leaf.png',
  },
  {
    name: 'Aromatic Spices',
    imgSrc: '../.././../public/Aromatic Spices.png',
  },
  {
    name: 'Seeds',
    imgSrc: '../.././../public/Seeds.png',
  },
  {
    name: 'Sweet Spices',
    imgSrc: '../.././../public/Sweet Spices.png',
  },
];

const CategoryGrid = () => {
  return (
    <>
<div>
      <h2 className='font-bold text-[2.5rem] p-2 m-auto mt-4 mb-2 flex justify-center'>
Top Spice Categories</h2>
</div>
    <div className="category-grid">

      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <img src={category.imgSrc} alt={category.name} className="category-image" />
          <h3 className="category-name">{category.name.toUpperCase()}</h3>
        </div>
      ))}
    </div>
    </>
  );
};

export default CategoryGrid;
