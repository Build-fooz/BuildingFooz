import { Outlet } from "react-router-dom";
// import Header from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      
      <div className="flex flex-1 pt-[120px] px-6">
        {/* Sidebar for Filters */}
        <aside className="w-[20%] bg-white shadow-md rounded-lg p-4 h-max">
          <Outlet context="filter" />
        </aside>

      </div>
    </div>
  );
}

export default ShoppingLayout;
