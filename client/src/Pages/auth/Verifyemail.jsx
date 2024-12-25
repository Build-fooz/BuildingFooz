import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../store/auth-slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
 //OTP form submission
  const OtpSubmit = (event) => {
    event.preventDefault();
    const { email } = location.state;

    dispatch(verifyOtp({ email, otp })).then((data) => {
      if (data?.payload?.success) {
        toast.success("OTP verified successfully!");
        navigate('/auth/resetpassword/${token}', { state: { email } }); //Reset Password
      } else {
        toast.error(data.payload?.message || "Invalid OTP! Please try again.");
      }
    });
  };

  return (
    <div className="w-full max-w-4xl p-16 space-y-10 bg-white shadow-2xl rounded-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#FF5722]">Verify OTP</h1>
        <p className="mt-5 text-xl text-gray-600">Enter the OTP sent to your email.</p>
      </div>
      <form onSubmit={OtpSubmit}>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white text-lg font-semibold py-3 rounded-lg shadow hover:bg-primary-dark"
          >
            Verify OTP
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default VerifyOtp;
