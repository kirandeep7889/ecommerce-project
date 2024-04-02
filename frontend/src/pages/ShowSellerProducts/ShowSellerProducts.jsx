import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSellerProduct, getSellerProducts } from "../../Redux/SellerProductSlice";
import { Link, useNavigate } from "react-router-dom";
import "./ShowSellerProducts.css"; 
import { ToastContainer } from "react-toastify";



const ShowSellerProducts = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();


  const { products, gettingProducts, error } = useSelector((state) => state.sellerProducts);

  useEffect(() => {
    dispatch(getSellerProducts());
  }, [dispatch]);

  if (gettingProducts) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const handleDeleteClick = (productId) => {
    dispatch(deleteSellerProduct(productId));
    navigate("/seller/showProducts")
  };

  return (
    <div className="edit-seller-products">
      <h1>Seller Products</h1>
      <div className="edit-product-container">
        {products.map((product) => (
          <div key={product._id} className="edit-product-card">
            <div className="edit-product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="edit-product-details">
              <h3 className="edit-product-title">{product.title}</h3>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <p>Price: Rs.{product.price}</p>
            </div>
            <div className="edit-product-actions">
              <Link className="edit-link" to={`/seller/editProduct/${product._id}`}>Edit</Link>
              <button className="edit-delete-button" onClick={() => handleDeleteClick(product._id)}>Delete</button>
              <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSellerProducts;
