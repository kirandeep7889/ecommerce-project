import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import productsReducer from './productsSlice'; 
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';
import userDetailsReducer from './userDetailsSlice';
import wishListReducer from './wishListSlice';
import SellerProductReducer from './SellerProductSlice';




const store = configureStore({
  reducer: {
    user: userReducer,
    products:productsReducer,
    cart:cartReducer,
    orders:ordersReducer,
    userDetails:userDetailsReducer,
    wishlist:wishListReducer,
    sellerProducts:SellerProductReducer

  },
});

export default store;
