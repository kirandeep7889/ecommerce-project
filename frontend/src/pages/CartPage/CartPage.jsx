
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItemFromCart } from '../../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CartPage.css';
import { addOrder } from '../../Redux/ordersSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success('Item removed from cart successfully!');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOnClick=(item)=> {
    const token=localStorage.getItem("token");
    if(!token) {
      toast.error("You are not signed up/logged in")
    }
    else{
      dispatch(addOrder(item));
      toast.success("item bought successfully")
    }

  }

  return (
    <div className="cart-page">
      <h1>CART ITEMS</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="item-details">
              <p className="item-name">{item.title}</p>
              <p className="item-quantity">Quantity: {item.quantity}</p>
              <p className="item-price">Total Price: ₹{item.price * item.quantity}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              <button onClick={()=>handleOnClick(item)} className="buy-now-button">Buy Now</button> 
            </div>
          </div>
        ))}
      </div>
      <h2 className="total-price">Total Price for all items: ₹{getTotalPrice()}</h2>
      <Link to="/orders" className="go-to-cart-link">Go to Orders →</Link>


      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default CartPage;
