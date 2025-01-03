import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonForm from '../../Components/common/form';
import { resetPasswordFormControls } from '../../config';
import { resetUserPassword } from '../../store/auth-slice';

const initialState = {
  newPassword: '',
  confirmPassword: '',
};

function ResetPassword() {
  const [formData, setFormData] = useState(initialState);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const { email } = location.state; //VerifyOtp
    dispatch(resetUserPassword({ email, ...formData })).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        navigate('/user/login');
      } else {
        toast.error(data.payload?.message || "Password reset failed! Please try again.");
      }
    });
  }

  return (
    <div className="w-full max-w-4xl p-16 space-y-10 bg-white shadow-2xl rounded-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#FF5722]">Reset Your Password</h1>
        <p className="mt-5 text-xl text-gray-600">
        Set a new password and confirm it to continue
        </p>
      </div>
      <CommonForm
        formControls={resetPasswordFormControls}
        buttonText={'Reset Password'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      /> 
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
