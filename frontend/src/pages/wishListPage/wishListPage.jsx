import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./wishListPage.css"
import { fetchWishlistItems } from '../../Redux/productsSlice';

const truncateDescription = (description) => {
  const words = description.split(' ');
  if (words.length > 50) {
    return words.slice(0, 20).join(' ') + '...';
  }
  return description;
};

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlistItems, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  return (
    <div className="wishlist-order-container">
      <h1>WISHLIST</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {wishlistItems.length === 0 && <p>No items in wishlist</p>}
      {wishlistItems.length > 0 && (
        <div className="wishlist-order-list">
          {wishlistItems.map((wishlistItem) => (
            <div className="wishlist-order" key={wishlistItem._id}>
              <img src={wishlistItem.product.image} alt={wishlistItem.product.title} className="wishlist-product-image" />
              <div className="wishlist-product-details">
                <div className="wishlist-product-title">{wishlistItem.product.title}</div>
                <div className="wishlist-product">
                  <div className="wishlist-product-price">Rs.{wishlistItem.product.price}</div>
                  <div className="wishlist-product-category">Category:{wishlistItem.product.category}</div>
                </div>
                <div className="wishlist-product-description">{truncateDescription(wishlistItem.product.description)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
