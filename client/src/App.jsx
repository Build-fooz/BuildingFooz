/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './App.css';
import Products from './Pages/Shopping-view/Products';
import individualuser from './Pages/images/individualuser.jpg';
import retailer from './Pages/images/retailer.jpg';
import './popup.css';
import Header from './Components/shopping-view/header';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import AdminSalesPage from "./pages/Admin-view/SalesPage";
import AdminAnalyticsPage from "./pages/Admin-view/AnalyticsPage";
import AdminSettingsPage from "./pages/Admin-view/SettingsPage";
import AuthLayout from './Components/auth/layout';
import ShoppingLayout from './Components/shopping-view/layout';
import Notfound from './Pages/not-found';
import ShoppingListing from './Pages/Shopping-view/listing';
import Checkout from './Pages/Shopping-view/checkout';
import CheckAuth from './Components/common/check-auth';
import Unauthpage from './Pages/UnAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuth } from './store/auth-slice';
import { ThreeDots } from 'react-loader-spinner';
import ForgotPassword from './Pages/auth/Forgotpassword';
import Account from './Pages/Shopping-view/account';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [userType, setUserType] = useState(null);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setIsPopupVisible(false);
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Show loading spinner if data is loading
  if (isLoading) return <FancyLoader />;

  return (
    <div>
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h1>Welcome to Fooz! </h1>
            <h3>Please select your user type: </h3>
            <div className="popup-images">
              <div className="image-item">
                <img
                  src={individualuser}
                  alt="Individual User"
                  onClick={() => handleUserTypeSelection('Individual')}
                  style={{ cursor: 'pointer' }}
                />
                <button
                  className="select-button"
                  onClick={() => handleUserTypeSelection('Individual')}
                >
                  I am an Individual User
                </button>
              </div>
              <div className="image-item">
                <img
                  src={retailer}
                  alt="Retailer"
                  onClick={() => handleUserTypeSelection('Retailer')}
                  style={{ cursor: 'pointer' }}
                />
                <button
                  className="select-button"
                  onClick={() => handleUserTypeSelection('Retailer')}
                >
                  I am a Retailer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <HeaderVisibility user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs category="about" />} />
        <Route path='/partner' element={<BecomeAPartner category="becomeapartner" />} />
        <Route path='/favorite' element={<Favorite category="favorite" />} />
        <Route path='/product' element={<Product category="product" />}>
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path="/" element={<Products />} />
        <Route path='/account' element={<Account />} />
        <Route path='/Whole-Spices' element={<WholeSpices />} />
        <Route path='/Tea' element={<Tea />} />
        <Route path='/Coffee' element={<Coffee />} />
        <Route path='/Powdered-Spices' element={<PowderedSpices />} />
        <Route path='*' element={<Notfound />} />

        {/* Authentication Routes */}
        <Route path='/user' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthSignUp />} />
          <Route path='resetpassword/:token' element={<ResetPassword />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
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
          <Route path='sales' element={<AdminSalesPage />} />
          <Route path='analytics' element={<AdminAnalyticsPage />} />
          <Route path='settings' element={<AdminSettingsPage />} />
        </Route>

        {/* Shop Route */}
        <Route path='/shopall' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout /> {/* Ensures layout is applied */}
          </CheckAuth>
        }>
          <Route path='checkout' element={<Checkout />} />
          <Route path='' element={<ShoppingListing />} /> {/* ShoppingListing as a child route */}
        </Route>

        {/* Unauthenticated Page */}
        <Route path='/unauthpage' element={<Unauthpage />} />
      </Routes>
    </div>
  );
}

//render header based on the user role and route
function HeaderVisibility({ user, isAuthenticated }) {
  const location = useLocation();
  const shouldRenderHeader = !location.pathname.startsWith("/admin") &&
    (!isAuthenticated || (user && user.role !== "admin"));

  return shouldRenderHeader ? <Header /> : null;
}

// Loading spinner during authentication check
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
