import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],  // Array to hold all cart items
    totalPrice: 0,  // Track total price
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, price, image } = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;  // Increment quantity if item exists
      } else {
        state.items.push({ productId, name, price, image, quantity: 1 });  // Add new item
      }

      state.totalPrice += price;  // Update total price
    },

    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item.productId === action.payload);
      if (index !== -1) {
        state.totalPrice -= state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);  // Remove item
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
