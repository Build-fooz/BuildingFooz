// BuildingFooz/Ecommerce App/src/Components/admin-view/layout.jsx
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div
      className="flex min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/signupbg.png')`,
      }}
    >
      <div className="flex flex-1 items-center justify-center bg-opacity-80 bg-[#FFF5E1] px-4 py-12 sm:px-6 lg:px-18">
        {/* This div is a semi-transparent overlay for better readability */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
