import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";
import shopProductsSlice from './products-slice';
import cartReducer from './cart-slice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer, 
    cart: cartReducer,
    shopProducts:shopProductsSlice
  },
});

export default store;
