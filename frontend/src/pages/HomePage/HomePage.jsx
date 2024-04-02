import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchProducts } from '../../Redux/productsSlice';
import { addItemToCart } from '../../Redux/cartSlice';
// import { addToWishlist } from '../../Redux/wishlistSlice'; // Import addToWishlist action
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryDropdown from '../../components/CategoryDropDown/CategoryDropDowm';
import { addItemToWishlist } from '../../Redux/wishListSlice';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products); 

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  const formatPriceToINR = (price) => {
    const exchangeRate = 73.3; 
    const priceInINR = (price * exchangeRate).toFixed(2);
    return `₹${priceInINR}`;
  };

  const truncateDescription = (description) => {
    return description.length > 30 ? `${description.substring(0, 30)}...` : description;
  };

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    toast.success('Item added to cart successfully!');
  };

  const handleAddToWishlist = (product) => {
    dispatch(addItemToWishlist(product))
  };

  return (
    <div className="home-page-container">
      <div className='Sort-container'>
          <CategoryDropdown/>
          <SearchBar/>
      </div>
      <Link className='cartLink' to="/cart" >Go to Cart →</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <p className="product-title">{truncateDescription(product.title)}</p>
                <p className="product-price">Price: {formatPriceToINR(product.price)}</p>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-stock">Stocks: {product.rating.count}</p>
                <button className='addCartBtn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <button className='addWishlistbtn' onClick={() => handleAddToWishlist(product)}>Add to Wish List</button> 
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default HomePage;
