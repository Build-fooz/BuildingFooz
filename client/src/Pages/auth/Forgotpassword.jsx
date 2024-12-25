
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '../../Components/common/form';
import { forgotPasswordFormControls } from '../../config';
import { sendOtp } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  email: "",
};

function ForgotPassword() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Sending OTP
  function onSubmit(event) {
    event.preventDefault();
    dispatch(sendOtp(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("OTP sent to your email successfully.");
        navigate('/auth/verifyotp',{ state: { email: formData.email } }); // Assuming a separate Verify OTP page exists
      } else {
        toast.error(data.payload?.message || "Failed to send OTP! Please try again.");
      }
    });
  }
  return (
    <div className="w-full max-w-4xl p-16 space-x-5 space-y-10 bg-white shadow-2xl rounded-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#FF5722]">
          Forgot Your Password?
        </h1>   
      </div>
      <CommonForm
        formControls={forgotPasswordFormControls}
        buttonText={'Send OTP'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <ToastContainer />
          {/* Redirect to Login */}
      <p className="mt-2 text-xl text-gray-600">
          Remember your password?
          <Link className="text-primary text-center ml-2 text-xl hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
    </div>
  );
}
export default ForgotPassword;
