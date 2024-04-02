import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import OrderPage from './pages/OrderPage/OrderPage';
import AddProductPage from './pages/AddProductPage/AddProductPage';
import ShowSellerProducts from './pages/ShowSellerProducts/ShowSellerProducts';
import EditPage from './pages/EditPage/EditPage';
import WishlistPage from './pages/wishListPage/wishListPage';


const App = () => {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/orders' element={<OrderPage/>} />
          <Route path='/seller/addProduct' element={<AddProductPage/>} />
          <Route path='/seller/showProducts' element={<ShowSellerProducts/>} />
          <Route path='/wishlist' element={<WishlistPage/>} />
          <Route path='/seller/editProduct/:productId' element={<EditPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;