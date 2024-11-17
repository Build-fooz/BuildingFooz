
// BuildingFooz/Ecommerce App/src/Components/admin-view/signup.jsx
// ... other imports
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '../../Components/common/form';
import { registerFormControls } from '../../config';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../store/auth-slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState = {
  userName: '',
  email: '',
  password: '',
};

function AuthSignUp() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(signUpUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        navigate('/auth/login');
      } else {
        toast.error(data.payload?.message || "Registration failed! Please try again.");
      }
    });
  }

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#FF5722]">Create new account</h1>
        <p className="mt-2 text-gray-600">
          Already have an account?
          <Link className="text-primary ml-2 hover:underline" to="/auth/login">Login</Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <ToastContainer />
    </div>
  );
}

export default AuthSignUp;
