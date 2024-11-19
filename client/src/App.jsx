import './App.css'
import Header from './Components/Header'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home'
import AboutAs from './Pages/AboutAs'
import BecomeAPartner from './Pages/BecomeAPartner'
import Favorite from './Pages/Favorite'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignUp from './Pages/LoginSignUp'
import WholeSpices from './Pages/WholeSpices'
import Tea from './Pages/Tea'
import Coffee from './Pages/Coffee'
import PowderedSpices from './Pages/PowderedSpices'
import React from 'react';
import ProductList from './Components/ProductList';
 import ProductForm from './Components/ProductForm';
 import BlogPost from './Components/BlogPost';
 import CustomerStory from './Components/CustomerStory';
import './App.css';

function App() {
  
return (
<>
<div>
<BrowserRouter>
<Header/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/about' element={<AboutAs category="about" />}/>
  <Route path='/becomeapartner' element={<BecomeAPartner category="becomeapartner" />}/>
  <Route path='/favorite' element={<Favorite category="favorite" />}/>
  <Route path='/product' element={<Product category="product" />} >
  <Route path=':productId' element={<Product/>}/>
  </Route>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/login' element={<LoginSignUp/>}/>

  <Route path='/Whole-Spices' element={<WholeSpices/>}/>
  <Route path='/Tea' element={<Tea/>}/>
  <Route path='/Coffee' element={<Coffee/>}/>
  <Route path='/Powdered-Spices' element={<PowderedSpices/>}/>
  
  <Route path="/add-product" element={<ProductForm />} />
  <Route path="/customer-stories" element={<CustomerStory />} />
  <Route path="/blog-posts" element={<BlogPost />} />
  <Route path="/productList" element={<ProductList />} />
</Routes>
</BrowserRouter>
</div>
</>
  )
}

export default App
