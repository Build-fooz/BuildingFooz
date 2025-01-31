// /src/components/Item.jsx
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cart-slice.js";

function Item({ id, name, price, image }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Dispatch action to add the item to the cart
    console.log("Adding to cart: ", { id, name, price, image });
    dispatch(addToCart({ id, name, price, image }));
  };

  return (
    <div className="border p-4 rounded-lg shadow mb-4">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">₹{price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white py-2 px-4 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Item;
