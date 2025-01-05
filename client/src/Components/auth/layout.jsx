import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AuthLayout() {
  return (
    <div
      className="flex min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/signupbg.png')`,
      }}
    >
      <div className="flex flex-1 items-center justify-center bg-opacity-70 bg-[#FFF5E1] px-12 py-12 sm:px-6 lg:px-18">
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
}

export default AuthLayout;
