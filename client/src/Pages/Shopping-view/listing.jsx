import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToCart } from "@/store/cart-slice.js";
import ProductFilter from "../../Components/shopping-view/filter";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

// Selectors
const cartItemsSelector = createSelector(
  [(state) => state.cart],
  (cart) => cart?.items || []
);

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  // Dummy Product List
  const dummyProductList = [
    { id: 1, name: "Turmeric Powder", price: 4.99, stock: 50, imageUrl: "/Aromatic Spices.png" },
    { id: 2, name: "Cumin Seeds", price: 3.49, stock: 30, imageUrl: "/Cinnamon Sticks.png" },
    { id: 3, name: "Coriander Powder", price: 2.99, stock: 40, imageUrl: "/Ground Spices.png" },
    { id: 4, name: "Chili Powder", price: 5.49, stock: 25, imageUrl: "/Seeds.png" },
    { id: 5, name: "Turmeric Powder", price: 4.99, stock: 50, imageUrl: "/Aromatic Spices.png" },
    { id: 6, name: "Cumin Seeds", price: 3.49, stock: 30, imageUrl: "/Cinnamon Sticks.png" },
    { id: 7, name: "Coriander Powder", price: 2.99, stock: 40, imageUrl: "/Ground Spices.png" },
    { id: 8, name: "Chili Powder", price: 5.49, stock: 25, imageUrl: "/Seeds.png" },
    { id: 9, name: "Turmeric Powder", price: 4.99, stock: 50, imageUrl: "/Aromatic Spices.png" },
    { id: 10, name: "Cumin Seeds", price: 3.49, stock: 30, imageUrl: "/Cinnamon Sticks.png" },
    { id: 11, name: "Coriander Powder", price: 2.99, stock: 40, imageUrl: "/Ground Spices.png" },
    { id: 12, name: "Chili Powder", price: 5.49, stock: 25, imageUrl: "/Seeds.png" },
  ];

  function handleAddToCart(product) {
    const existingItem = cartItems.find((item) => item.productId === product.id);
    if (existingItem && existingItem.quantity >= product.stock) {
      toast.error(`Only ${product.stock - existingItem.quantity} more available.`);
      return;
    }

    dispatch(
      addToCart({
        productId: product.id, // Use productId for consistency
        quantity: 1,
        name: product.name,
        price: product.price,
        image: product.imageUrl, // Ensure image is passed
      })
    );

    toast.success(`${product.name} added to cart!`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4 bg-[#FFE4E1] w-full">
      <ProductFilter filters={filters} setFilters={setFilters} />
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="p-4 border-b flex justify-between">
          <h2 className="text-3xl font-semibold">All Products</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowUpDownIcon className="h-4 w-4" /> Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {dummyProductList.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
              <p className="text-sm">₹{product.price}</p>
              <Button className="mt-3 bg-[#FF6347]" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default ProductList;