import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import productsReducer from './productsSlice'; 
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';




const store = configureStore({
  reducer: {
    user: userReducer,
    products:productsReducer,
    cart:cartReducer,
    orders:ordersReducer

  },
});

export default store;
