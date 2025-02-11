import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToCart } from "@/store/cart-slice.js";
import ProductFilter from "../../Components/shopping-view/filter";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";

// Selectors
const cartItemsSelector = createSelector(
  [(state) => state.cart],
  (cart) => cart?.items || []
);

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(cartItemsSelector);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Dummy Product List
  const dummyProductList = [
    { id: 1, name: "Turmeric Powder", price: 4.99, stock: 50, imageUrl: "/Aromatic Spices.png" },
    { id: 2, name: "Cumin Seeds", price: 3.49, stock: 30, imageUrl: "/Cinnamon Sticks.png" },
    { id: 3, name: "Coriander Powder", price: 2.99, stock: 40, imageUrl: "/Ground Spices.png" },
    { id: 4, name: "Chili Powder", price: 5.49, stock: 25, imageUrl: "/Seeds.png" },
  ];

  function handleOpenQuantitySelector(product) {
    setSelectedProduct(product);
    setSelectedQuantity(1); // Reset quantity when a new product is selected
  }

  function handleAddToCart() {
    if (!selectedProduct) return;

    const existingItem = cartItems.find((item) => item.productId === selectedProduct.id);
    if (existingItem && existingItem.quantity + selectedQuantity > selectedProduct.stock) {
      toast.error(`Only ${selectedProduct.stock - existingItem.quantity} more available.`);
      return;
    }

    dispatch(
      addToCart({
        productId: selectedProduct.id, 
        quantity: selectedQuantity,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.imageUrl, 
      })
    );

    toast.success(`${selectedProduct.name} (x${selectedQuantity}) added to cart!`);
    setSelectedProduct(null); // Close the modal after adding to cart
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4 bg-[#FFE4E1] w-full">
      <ProductFilter filters={filters} setFilters={setFilters} />
      <div className="bg-white rounded-lg shadow-md p-5 relative">
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {dummyProductList.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
              <p className="text-sm">₹{product.price}</p>
              <Button className="mt-3 bg-[#FF6347]" onClick={() => handleOpenQuantitySelector(product)}>
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {/* Add to Cart Button at Bottom */}
        <Button 
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-[#FF6347] text-white px-6 py-3 rounded-lg shadow-lg text-lg" 
          onClick={() => navigate("/cart")}
        >
          Go to Cart
        </Button>
      </div>

      {/* Quantity Selector Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Select Quantity</h2>
            <div className="flex items-center justify-center gap-4">
              <button 
                className="px-3 py-1 bg-gray-200 rounded" 
                onClick={() => setSelectedQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="w-12 text-center border rounded"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Math.max(1, Math.min(selectedProduct.stock, parseInt(e.target.value) || 1)))}
              />
              <button 
                className="px-3 py-1 bg-gray-200 rounded" 
                onClick={() => setSelectedQuantity((prev) => Math.min(selectedProduct.stock, prev + 1))}
              >
                +
              </button>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={handleAddToCart} className="bg-[#FF6347] text-white">
                Confirm
              </Button>
              <Button onClick={() => setSelectedProduct(null)} className="bg-gray-400 text-white">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

               <ToastContainer
                         position="bottom-right"
                         autoClose={3000}
                          theme="light" // Ensures background stays white
                            toastStyle={{ backgroundColor: "#fff", color: "#FF4500" }} // White background, Orange Red text
                             progressStyle={{ backgroundColor: "#FF4500" }} // Orange Red progress bar
                                iconTheme={{ primary: "#FF4500", secondary: "#fff" }} // Orange Red tick icon
                   />
    </div>
  );
}

export default ProductList;
