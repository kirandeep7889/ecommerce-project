// AddProductForm.jsx
import React, { useState } from 'react';
import './AddProductForm.css';
import { useDispatch } from 'react-redux';
import { addSellerProduct } from '../../Redux/SellerProductSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AddProductForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState({ rate: 0, count: 0 });


  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      price,
      description,
      category,
      image,
    };
    dispatch(addSellerProduct(newProduct));
    navigate("/seller/showProducts"); 
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Category:</label>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

      <label>Image URL:</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <button type="submit">Add Product</button>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </form>
    
  );
};

export default AddProductForm;
