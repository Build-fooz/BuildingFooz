import React, { useEffect, useState } from 'react';
import './App.css';
import './popup.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { checkAuth } from './store/auth-slice';

// Import components and pages
import Header from './Components/shopping-view/header';
import Footer from './Pages/Shopping-view/footer';
import Products from './Pages/Shopping-view/Products'; 
import Home from './Pages/Shopping-view/Home';
import AboutUs from './Pages/Shopping-view/AboutUs';
import BecomeAPartner from './Pages/Shopping-view/BecomeAPartner';
import Favorite from './Pages/Shopping-view/Favorite';
import Product from './Pages/Shopping-view/Products'; 
import Cart from './Pages/Shopping-view/Cart';
import AuthLogin from './Pages/auth/Login';
import AuthSignUp from './Pages/auth/SignUp';
import ResetPassword from './Pages/auth/Reset-password';
import WholeSpices from './Pages/Shopping-view/WholeSpices';
import Tea from './Pages/Shopping-view/Tea';
import Coffee from './Pages/Shopping-view/Coffee';
import PowderedSpices from './Pages/Shopping-view/PowderedSpices';
import AdminLayout from './Components/Admin-view/Layout';
import AdminDashboard from './Pages/Admin-view/dashboard';
import AdminProducts from './Pages/Admin-view/products';
import AdminOrders from './Pages/Admin-view/orders';
import AdminFeatures from './Pages/Admin-view/features';
import AdminSalesPage from './Pages/Admin-view/SalesPage';
import AdminAnalyticsPage from './Pages/Admin-view/AnalyticsPage';
import AdminSettingsPage from './Pages/Admin-view/SettingsPage';
import AuthLayout from './Components/auth/layout';
import ShoppingLayout from './Components/shopping-view/layout';
import Notfound from './Pages/not-found';
import ShoppingListing from './Pages/Shopping-view/listing';
import Checkout from './Pages/Shopping-view/checkout';
import CheckAuth from './Components/common/check-auth';
import Unauthpage from './Pages/UnAuth';
import ForgotPassword from './Pages/auth/Forgotpassword';
import Account from './Pages/Shopping-view/account';
import individualuser from './Pages/images/individualuser.jpg';
import retailer from './Pages/images/retailer.jpg';
import ComingSoon from './Pages/Shopping-view/ComingSoon';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setIsPopupVisible(false);
    if (type === 'Individual') {
      navigate('/comingsoon');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <FancyLoader />;

  return (
    <div>
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-inner-content">
              <h1 className="welcome-title">Welcome to Fooz</h1>
              <h2 classname="selectoption">Please select your user type:</h2>
              <div className="user-type-options">
                <div className="user-type-option" onClick={() => handleUserTypeSelection('Individual')}>
                  <img src={individualuser} alt="Individual User" />
                  <div className="user-details">
                    <h2>INDIVIDUAL</h2>
                    <p>Get premium quality products at the best price!</p>
                    <ul>
                      <li>Looking for spices suitable for household use</li>
                      <li>Perfect for homes and small restaurants</li>
                      <li>Ideal for orders less than 10 Kg</li>
                    </ul>
                  </div>
                  <button className="select-button">I am an Individual User</button>
                </div>

                <div className="user-type-option" onClick={() => handleUserTypeSelection('Retailer')}>
                  <img src={individualuser} alt="Retailer" />
                  <div className="user-details">
                    <h2>RETAILER</h2>
                    <p>Get premium quality products at the best price!</p>
                    <ul>
                        <li>Bulk orders available for 10 KG+</li>
                       <li>Perfect for restaurants, hotels, and businesses</li>
                       <li>Special pricing and dedicated support</li>
                    </ul>
                  </div>
                  <button className="select-button">I am a Retailer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <HeaderVisibility user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs category="about" />} />
        <Route path="/partner" element={<BecomeAPartner category="becomeapartner" />} />
        <Route path="/favorite" element={<Favorite category="favorite" />} />
        <Route path="/product" element={<Product category="product" />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/Whole-Spices" element={<WholeSpices />} />
        <Route path="/Tea" element={<Tea />} />
        <Route path="/Coffee" element={<Coffee />} />
        <Route path="/Powdered-Spices" element={<PowderedSpices />} />
        <Route path="*" element={<Notfound />} />

        {/* Authentication Routes */}
        <Route
          path="/user"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthSignUp />} />
          <Route path="resetpassword/:token" element={<ResetPassword />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="sales" element={<AdminSalesPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Shop Routes */}
        <Route
          path="/shopall"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="checkout" element={<Checkout />} />
          <Route path="" element={<ShoppingListing />} />
        </Route>

        {/* Unauthenticated Page */}
        <Route path="/unauthpage" element={<Unauthpage />} />

        {/* Coming Soon Page */}
        <Route path="/comingsoon" element={<ComingSoon />} />
      </Routes>

      <Footer />
    </div>
  );
}

function HeaderVisibility({ user, isAuthenticated }) {
  const location = useLocation();
  const shouldRenderHeader =
    !location.pathname.startsWith('/admin') &&
    (!isAuthenticated || (user && user.role !== 'admin'));

  return shouldRenderHeader ? <Header /> : null;
}

const FancyLoader = () => {
  return (
    <div style={loaderContainerStyle}>
      <ThreeDots height="80" width="80" color="gray" ariaLabel="loading" visible={true} />
    </div>
  );
};

const loaderContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f7f7f7',
};

export default App;
