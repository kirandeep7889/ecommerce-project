import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../Redux/userDetailsSlice';
import "./Header.css";

const Header = ({userType}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(store => store.userDetails.user);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="Header">
      <div className="Header-left">
        <img alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyjd_UEBCnqCCbj9lqjiEDVOBCKMJcuZ0XyNmIxrUxtgbevkO5vxnRQO4kOsnMAgSZGeM&usqp=CAU" width={"100px"} height={"90px"} />
      </div>
      <div className="Header-center">
        <h2>ONLINE-STORE</h2>
      </div>
      <div className="Header-right">
        <ul>
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
          <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        </ul>
        <button className="menu-button" onClick={toggleMenu}>
          User/Seller
        </button>
        {user && isMenuOpen && (
          <div className="menu">
            { !user.isSeller ? (
              <div>
                <h2>CUSTOMER</h2>
                <NavLink to="/cart" className="MenuItem" onClick={toggleMenu}>Go to Cart</NavLink>
                <NavLink to="/orders" className="MenuItem" onClick={toggleMenu}>Your Order Details</NavLink>
                <NavLink to="/wishlist" className="MenuItem" onClick={toggleMenu}>Your Wishlist Items</NavLink>
              </div>
            ) : (
              <div>
                <h2>SELLER</h2>
                <NavLink to="/seller/addProduct" className="MenuItem" onClick={toggleMenu}>Add Product</NavLink>
                <NavLink to="/seller/showProducts" className="MenuItem" onClick={toggleMenu}>Display Products</NavLink>
                <NavLink to="/orders-page" className="MenuItem" onClick={toggleMenu}>Orders Page</NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
