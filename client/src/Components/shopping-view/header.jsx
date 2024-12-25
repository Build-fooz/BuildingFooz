import { useState, useRef, useEffect } from "react";
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
  headermain: `mt-10 bg-[#fdbdbd] flex items-center justify-between h-[80px] px-5 py-6 shadow-md`,
  navLink: `text-[22px] font-bold transition-colors duration-300 px-8 hover:text-black`,
  dropdown: `absolute top-full left-0 space-y-2 space-x-1 bg-gray-50 border-gray-300 shadow-lg rounded-lg w-[240px] text-left mt-4 z-[50]`,
  dropdownItem: `px-5 py-2 text-[18px] text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer transition-colors duration-200`,
  moreButton: `flex items-center text-[22px] font-bold text-gray-700 transition-colors duration-200 ease-in-out hover:text-gray-900`,
  moreText: `mr-1`,
};

const AuthState = (state) => state.auth;
const CartState = (state) => state.shopCart;

const isAuthenticatedSelector = createSelector(
  [AuthState],
  (auth) => auth.isAuthenticated
);

const userSelector = createSelector(
  [AuthState],
  (auth) => auth.user
);

const cartItemsSelector = createSelector(
  [CartState],
  (shopCart) => shopCart?.cartItems?.items ?? []
);

const Header = () => {
  const [isActive, setIsActive] = useState("home");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const user = useSelector(userSelector);
  const cartItems = useSelector(cartItemsSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const Logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
     // Close dropdown if clicked outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <>
      <div className={styles.wrapper}>
        FLAT 30% OFF ON ALL PRODUCTS! USE CODE: <strong>FOOZ</strong>
      </div>

      <header className={styles.headermain}>
        <div>
          <Link to="/">
            <img src="/file.png" alt="Logo" className="h-[60px] w-[155px] py-0.2 mt-3 object-contain" />
          </Link>
        </div>

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
          <div className="relative" ref={dropdownRef} role="menu" aria-haspopup="true">
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
                      onClick={() => {
                        setDropdownVisible(false);
                        setIsActive("more");
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
        <div className="flex items-center space-x-6">
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
                <DropdownMenuItem onClick={Logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth/login">
              <button className="px-4 py-2 text-gray-600 border border-gray-400 rounded-full hover:bg-gray-100">
                Login
              </button>
            </Link>
          )}
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
