/* eslint-disable no-unused-vars */
import ProductFilter from "../../Components/shopping-view/filter";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { sortOptions } from "../../config";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

// Selectors for accessing Redux states
const ShopProducts = (state) => state.shopProducts;
const ShopCart = (state) => state.shopCart;
const Auth = (state) => state.auth;

const productListSelector = createSelector(
  [ShopProducts],
  (shopProducts) => shopProducts?.productList || []
);

const productDetailsSelector = createSelector(
  [ShopProducts],
  (shopProducts) => shopProducts?.productDetails || null
);

const cartItemsSelector = createSelector(
  [ShopCart],
  (shopCart) => shopCart?.cartItems || {}
);

const userSelector = createSelector(
  [Auth],
  (auth) => auth?.user || null
);

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const productList = useSelector(productListSelector);
  const productDetails = useSelector(productDetailsSelector);
  const cartItems = useSelector(cartItemsSelector);
  const user = useSelector(userSelector);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const categorySearchParam = searchParams.get("Category");

  // Handle sorting option change
  function handleSort(value) {
    setSort(value);
  }

  // Update filters and store in session
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  // Fetch product details for the dialog
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // Add product to cart with stock check
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getTotalStock - getQuantity} quantity can be added for this item`);
          return;
        }
      }
    }
  }

  // Initialize sorting and filters
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  // Update URL with current filters
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters, setSearchParams]);

  // Open product details dialog when details are fetched
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4 md:p-6 bg-[#FFE4E1] w-full">
      {/* Filter Component */}
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      
      {/* Product List and Sorting */}
      <div className="bg-white rounded-lg shadow-md p-5 col-span-full md:col-span-1">
        <div className="p-4 border-b flex items-center justify-between bg-[#F5F5F5] rounded-md">
          <h2 className="text-3xl font-semibold text-gray-800">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-1xl flex items-center gap-1 bg-gray-300 border-[#F5F5F5] text-gray-700"
                >
                  <ArrowUpDownIcon className="h-4 w-4 bg-gray text-black-700" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#F5F5F5] rounded-md shadow-lg">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className="text-1xl text-gray-700 hover:bg-white"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-white rounded-lg">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem.id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                  className="transition-transform transform hover:scale-105"
                />
              ))
            : null}
        </div>
      </div>
      
      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default ShoppingListing;
