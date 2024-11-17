/* eslint-disable react/prop-types */
// App.jsx
import './App.css';
import Header from './Components/shopping-view/header';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import BecomeAPartner from './Pages/BecomeAPartner';
import Favorite from './Pages/Favorite';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import AuthLogin from './Pages/auth/Login';
import AuthSignUp from './Pages/auth/SignUp';
import WholeSpices from './Pages/WholeSpices';
import Tea from './Pages/Tea';
import Coffee from './Pages/Coffee';
import PowderedSpices from './Pages/PowderedSpices';
import AdminLayout from './Components/Admin-view/Layout';
import AdminDashboard from './Pages/Admin-view/dashboard';
import AdminProducts from './Pages/Admin-view/products';
import AdminOrders from './Pages/Admin-view/orders';
import AdminFeatures from './Pages/Admin-view/features';
import AuthLayout from './Components/auth/layout';
import ShoppingLayout from './Components/shopping-view/layout';
import Notfound from './Pages/not-found';
import ShoppingListing from './Pages/Shopping-view/listing';
import Checkout from './Pages/Shopping-view/checkout';
import CheckAuth from './Components/common/check-auth';
import Unauthpage from './Pages/UnAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import { ThreeDots } from 'react-loader-spinner';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <FancyLoader />;

  return (
    <div>
      <HeaderVisibility user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs category="about" />} />
        <Route path='/becomeapartner' element={<BecomeAPartner category="becomeapartner" />} />
        <Route path='/favorite' element={<Favorite category="favorite" />} />
        <Route path='/product' element={<Product category="product" />}>
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/Whole-Spices' element={<WholeSpices />} />
        <Route path='/Tea' element={<Tea />} />
        <Route path='/Coffee' element={<Coffee />} />
        <Route path='/Powdered-Spices' element={<PowderedSpices />} />
        <Route path='*' element={<Notfound />} />

        {/* Auth Routes */}
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='signup' element={<AuthSignUp />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>

        {/* Shopping Routes */}
        <Route path='/shopall' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>element={<ShoppingListing />}
            <ShoppingLayout />
          </CheckAuth>
        }>
          
          <Route path='checkout' element={<Checkout />} />
        </Route>

        {/* Unauthorized Page */}
        <Route path='/unauthpage' element={<Unauthpage />} />
      </Routes>
    </div>
  );
}

// Sub-component for handling Header visibility based on route and role
function HeaderVisibility({ user, isAuthenticated }) {
  const location = useLocation();
  const shouldRenderHeader = !location.pathname.startsWith("/admin") && 
    (!isAuthenticated || (user && user.role !== "admin"));

  return shouldRenderHeader ? <Header /> : null;
}

const FancyLoader = () => {
  return (
    <div style={loaderContainerStyle}>
      <ThreeDots
        height="80"
        width="80"
        color="gray"
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
};

const loaderContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f7f7f7",
};

export default App;
