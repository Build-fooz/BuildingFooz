/* eslint-disable react/prop-types */
/* Header.jsx */
import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await dispatch(logoutUser()).unwrap();
      if (response.success) {
        navigate("/auth/login");
      } else {
        console.error("Logout failed: Response unsuccessful");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#F5F5DC] border-b border-[#D8CDAF]">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block text-[#333333]"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-center">
        <img src="/file.png" alt="Logo" className="h-[60px] w-[170px]" />
      </div>
      <div className="flex items-center gap-6">
        <Button
          onClick={handleLogout}
          className="flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium bg-[#000000] text-white hover:bg-[#2A4365]"
        >
          <LogOut />
          LogOut
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;