import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full" style={{ backgroundColor: '#FFF8E1' }}> {/* Light cream mixed with white */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-[#FFF3E0] p-4 md:p-6"> {/* Slightly darker cream for main content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
