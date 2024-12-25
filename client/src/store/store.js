import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";  // Correct the import
import shopProductsSlice from './products-slice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer, 
    shopProducts:shopProductsSlice
  },
});

export default store;
