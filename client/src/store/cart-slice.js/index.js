import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],  // Array to hold all cart items
    totalPrice: 0,  // Track total price
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, price, image, quantity } = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;  // Increment quantity if item exists
        state.totalPrice += price * quantity;  // Update total price based on quantity
      } else {
        state.items.push({ productId, name, price, image, quantity });
        state.totalPrice += price * quantity;  // Add new item price based on quantity
      }
    },

    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item.productId === action.payload);
      if (index !== -1) {
        state.totalPrice -= state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);  // Remove item
      }
    },

    updateTotalPrice: (state) => {
      // Recalculate total price based on current cart items
      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});

export const { addToCart, removeFromCart, updateTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
