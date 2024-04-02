import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editSellerProduct, getSellerProducts } from "../../Redux/SellerProductSlice";

import "./EditPage.css"; 
import { ToastContainer, toast } from "react-toastify";

export default function EditPage() {
    const { productId } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, gettingProducts, error } = useSelector((state) => state.sellerProducts);

    useEffect(() => {
        dispatch(getSellerProducts());
    }, [dispatch]);

    const product = products.find(product => product._id === productId);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        price: ""
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                category: product.category,
                description: product.description,
                price: product.price
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(editSellerProduct({ productId, formData }));
            navigate("/seller/showProducts");

        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product');
        }
    };

    if (gettingProducts) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!product) {
        return <div className="error">Product not found</div>;
    }

    return (
        <div className="edit-page">
            <h1>Edit Product</h1>
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="input-field" type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input className="input-field" type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input className="input-field" type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <button type="submit" className="update-button">Update Product</button>
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </form>
        </div>
    );
}
