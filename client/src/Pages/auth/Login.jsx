/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '../../Components/common/form';
import { loginForm } from '../../config';
import { loginUser } from '../../store/auth-slice/index';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    <div className="w-full max-w-4xl p-16 space-y-10 bg-white shadow-2xl rounded-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#FF5722]">Login in to your account</h1>
        <p className="mt-5 text-xl text-gray-600">
          Don't have an account? 
          <Link className="text-primary ml-2 text-xl hover:underline" to="/user/register">Sign Up</Link>
        </p>   
      </div>
      <CommonForm
        formControls={loginForm}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <ToastContainer />
         {/* Forgot Password Link */}
      <p className="mt-2 text-right text-xl text-gray-600">
         Forgot password?
          <Link className="text-primary ml-2  text-xl hover:underline" to="/user/forgotpassword">
            Verify email
          </Link>
        </p>
    </div>
    
  );
}

export default AuthLogin;
