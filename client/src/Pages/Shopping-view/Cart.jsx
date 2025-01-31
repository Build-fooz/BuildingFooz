import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store/cart-slice.js";
import { Button } from "@/components/ui/button";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in the cart</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="border p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={item.image || "default_image.jpg"}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
              <Button
                className="mt-3 bg-red-500 text-white"
                onClick={() => dispatch(removeFromCart(item.productId))}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-xl font-semibold mt-4">Total: ₹{totalPrice}</h3>
    </div>
  );
}

export default CartPage;
