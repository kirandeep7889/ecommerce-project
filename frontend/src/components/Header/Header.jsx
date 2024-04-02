import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { FiMenu } from 'react-icons/fi';
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../Redux/userDetailsSlice';

const Header = ({userType}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch=useDispatch();
  const user=useSelector(store=>store.userDetails.user)

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <IconButton
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FiMenu />
        </IconButton>
        {/* Conditional rendering of the Menu */}
        {user && (
          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            { !user.isSeller ? (
              [
                <h2 key="customer">CUSTOMER</h2>,
                <MenuItem key="cart" className="MenuItem" onClick={handleClose}><NavLink to="/cart" style={{ textDecoration: 'none' }}>Go to Cart</NavLink></MenuItem>,
                <MenuItem key="orders" className="MenuItem" onClick={handleClose}><NavLink to="/orders" style={{ textDecoration: 'none' }}>Your Order Details</NavLink></MenuItem>,
                <MenuItem key="wishlist" className="MenuItem" onClick={handleClose}><NavLink to="/wishlist" style={{ textDecoration: 'none' }}>Your Wishlist Items</NavLink></MenuItem>
              ]
            ) : (
              [
                <h2 key="seller">SELLER</h2>,
                <MenuItem key="addProduct" className="MenuItem" onClick={handleClose}><NavLink to="/seller/addProduct" style={{ textDecoration: 'none' }}>Add Product</NavLink></MenuItem>,
                <MenuItem key="showProducts" className="MenuItem" onClick={handleClose}><NavLink to="/seller/showProducts" style={{ textDecoration: 'none' }}>Display Products</NavLink></MenuItem>,
                <MenuItem key="ordersPage" className="MenuItem" onClick={handleClose}><NavLink to="/orders-page" style={{ textDecoration: 'none' }}>Orders Page</NavLink></MenuItem>
              ]
            )}
          </Menu>
        )}
      </div>
    </div>
  );
}

export default Header;
