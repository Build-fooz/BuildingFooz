import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '../../Components/common/form';
import { registerForm } from '../../config';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../store/auth-slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState = {
  name: '',
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
        toast.success("Congrats! Registration Successful");
        navigate('/user/login');
      } else {
        toast.error(data.payload?.message || "Registration failed! Please try again.");
      }
    });
  }
  

  return (
    <div className="w-full max-w-4xl p-16 space-y-10 bg-white shadow-2xl rounded-2xl">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#FF5722]">Create new account</h1>
      </div>
      <CommonForm
        formControls={registerForm}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <ToastContainer />

      {/* Redirect to Login */}
      <p className="mt-2 text-center text-xl text-gray-600">
          Already have an account?
          <Link className="text-primary text-xl ml-2 hover:underline" to="/user/login">Login</Link>
        </p>   
    </div>
  );
}

export default AuthSignUp;
