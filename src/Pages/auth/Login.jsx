/* eslint-disable react/no-unescaped-entities */
// BuildingFooz/Ecommerce App/src/Components/admin-view/login-page.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '../../Components/common/form';
import { loginFormControls } from '../../config';
import { loginUser } from '../../store/auth-slice/index';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// BuildingFooz/Ecommerce App/src/Components/admin-view/login-page.jsx
// ... other imports
const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
      } else {
        toast.error(data.payload?.message || "Login failed! Please try again.");
      }
    });
  }

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#FF5722]">Sign in to your account</h1>
        <p className="mt-2 text-gray-600">
          Don't have an account? 
          <Link className="text-primary ml-2 hover:underline" to="/auth/signup">Sign Up</Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <ToastContainer />
    </div>
  );
}

export default AuthLogin;
