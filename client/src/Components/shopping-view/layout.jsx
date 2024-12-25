import { Outlet } from "react-router-dom";

function ShoppingLayout() {
  return (
    <div className="bg-[#FFE4E1] min-h-screen"> 
          <Outlet context="filter" />
    </div>
  );
}

export default ShoppingLayout;
