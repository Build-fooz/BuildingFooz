import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import logo from ".././../public/file.png"
const styles = {
  wrapper: `bg-[#fb5b5b] text-black text-center py-2 font-bold fixed top-0 w-full z-50`,
  headermain: `mt-10 bg-[#fdbdbd] text-center flex items-center h-[80px]`,
  navLink: `text-[18px] font-medium transition-colors duration-300 hover:text-black`,
  dropdown: `absolute top-[100%] left-0 bg-white border border-gray-200 shadow-md rounded-md w-[200px] text-left mt-1`,
  dropdownItem: `px-2 py-2 text-[15px] text-black hover:bg-gray-100 cursor-pointer transition-colors duration-200`,
  moreButton: `flex items-center text-[18px] font-medium transition-colors duration-300 hover:text-black`,
  moreText: `mr-1`,
};

const Header = () => {
  const [isActive, setIsActive] = useState("home");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className={styles.wrapper}>
        FLAT 30% OFF ON ALL PRODUCTS! USE CODE: <strong>FOOZ</strong>
      </div>
      <header className={styles.headermain}>
        <div className="flex cursor-pointer">
          <img src={logo} alt="logo" className="h-[50px] w-[170px] mt-3" />
        </div>
        <div className="mx-auto text-2xl">
          <nav className="hidden md:flex space-x-6">
            <Link
              to={"/"}
              className={`${styles.navLink} ${
                isActive === "home" ? "text-red-600" : "text-gray-500"
              }`}
              onClick={() => setIsActive("home")}
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className={`${styles.navLink} ${
                isActive === "about" ? "text-red-600" : "text-gray-500"
              }`}
              onClick={() => setIsActive("about")}
            >
              About Us
            </Link>
            <Link
              to={"/becomeapartner"}
              className={`${styles.navLink} ${
                isActive === "partner" ? "text-red-600" : "text-gray-500"
              }`}
              onClick={() => setIsActive("partner")}
            >
              Become a Partner
            </Link>
            <Link
              to={"/favorite"}
              className={`${styles.navLink} ${
                isActive === "favorite" ? "text-red-600" : "text-gray-500"
              }`}
              onClick={() => setIsActive("favorite")}
            >
              Favorite
            </Link>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`${styles.moreButton} ${
                  isActive === "more" ? "text-red-600" : "text-gray-500"
                }`}
              >
                <span className={styles.moreText}>More</span> 
                <IoIosArrowDown />
              </button>
              {dropdownVisible && (
                <ul className={styles.dropdown}>
                  <li>
                    <Link
                      to={"/shopall"}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      Shop All
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/wholespices"}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      Whole Spices
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/aromaticspices"}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      Aromatic Spices
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/herbsandleafyspices"}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      Herbs and Leafy Spices
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/sweetspices"}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      Sweet Spices
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/seeds"}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      Seeds
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/exoticregionalspices"}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      Exotic/Regional Spices
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/groundspices"}
                      className={styles.dropdownItem}
                      onClick={() => setDropdownVisible(false)}
                    >
                      Ground Spices
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-[45px]">
          <Link to={"/login"}>
            <button className="w-[100px] h-[45px] outline-none border border-[#7a7a7a] rounded-[75px] text-[#515151] text-[20px] font-medium bg-white cursor-pointer active:bg-[#f3f3f3]">
              Login
            </button>
          </Link>
          <Link to={"/cart"}>
            <MdOutlineShoppingCart className="h-[45px] w-[45px] cursor-pointer" />
          </Link>
          <div className="w-[22px] h-[22px] flex justify-center items-center -mt-[35px] -ml-[55px] rounded-[11px] text-[14px] bg-red-500 text-white">
            0
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
