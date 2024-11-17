import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { createSelector } from "reselect";

const styles = {
  wrapper: `bg-[#fb5b5b] text-black text-center py-2 font-bold fixed top-0 w-full z-50`,
  headermain: `mt-10 bg-[#fdbdbd] flex items-center justify-between h-[80px] px-6 shadow-md`,
  navLink: `text-[18px] font-medium transition-colors duration-300 hover:text-black`,
  dropdown: `absolute top-[100%] left-0 bg-white border border-gray-200 shadow-md rounded-md w-[200px] text-left mt-1`,
  dropdownItem: `px-2 py-2 text-[15px] text-black hover:bg-gray-100 cursor-pointer transition-colors duration-200`,
  moreButton: `flex items-center text-[18px] font-medium transition-colors duration-300 hover:text-black`,
  moreText: `mr-1`,
};

// Memoized selectors for state
const selectAuthState = (state) => state.auth;
const selectCartState = (state) => state.shopCart;

const isAuthenticatedSelector = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

const userSelector = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

const cartItemsSelector = createSelector(
  [selectCartState],
  (shopCart) => shopCart?.cartItems?.items ?? []
);

const Header = () => {
  const [isActive, setIsActive] = useState("home");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const user = useSelector(userSelector);
  const cartItems = useSelector(cartItemsSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      {/* Promo Banner */}
      <div className={styles.wrapper}>
        FLAT 30% OFF ON ALL PRODUCTS! USE CODE: <strong>FOOZ</strong>
      </div>

      {/* Main Header */}
      <header className={styles.headermain}>
        {/* Logo Section */}
        <div>
          <Link to="/">
            <img src="/file.png" alt="Logo" className="h-[50px] w-[150px] object-contain" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          {["home", "about", "partner", "favorite"].map((section) => (
            <Link
              key={section}
              to={`/${section === "home" ? "" : section}`}
              className={`${styles.navLink} ${isActive === section ? "text-red-600" : "text-gray-500"}`}
              onClick={() => setIsActive(section)}
            >
              {section === "home" ? "Home" : section.replace(/^\w/, (c) => c.toUpperCase())}
            </Link>
          ))}

          {/* Dropdown for More */}
          <div className="relative" role="menu" aria-haspopup="true">
            <div
              onClick={toggleDropdown}
              className={`${styles.moreButton} ${isActive === "more" ? "text-red-600" : "text-gray-500"}`}
              role="button"
              aria-expanded={dropdownVisible}
            >
              <span className={styles.moreText}>More</span>
              <IoIosArrowDown />
            </div>
            {dropdownVisible && (
              <ul className={styles.dropdown}>
                {[
                  "Shop All",
                  "Whole Spices",
                  "Aromatic Spices",
                  "Herbs & Leafy Spices",
                  "Sweet Spices",
                  "Seeds",
                  "Exotic/Regional Spices",
                  "Ground Spices",
                ].map((label) => (
                  <li key={label}>
                    <Link
                      to={`/${label.replace(/\s+/g, "").toLowerCase()}`}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* User and Cart Section */}
        <div className="flex items-center space-x-6">
          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-black">
                  <AvatarFallback className="bg-black text-white font-bold">
                    {user?.userName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>
                  Logged in as {user?.userName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/shop/account")}>Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth/login">
              <button className="px-4 py-2 text-gray-600 border border-gray-400 rounded-full hover:bg-gray-100">
                Login
              </button>
            </Link>
          )}

          {/* Cart Icon */}
          <div className="relative">
            <MdOutlineShoppingCart
              className="h-[45px] w-[45px] cursor-pointer text-gray-600 hover:text-black"
              onClick={() => navigate("/cart")}
              aria-label="View Cart"
            />
            {cartItems.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
