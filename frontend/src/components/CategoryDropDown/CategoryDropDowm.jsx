import React from 'react';
import './CategoryDropDown.css';
import { useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../Redux/productsSlice';

const CategoryDropdown = () => {
    const dispatch = useDispatch();
    const categories = ['electronics', 'women\'s clothing', 'men\'s clothing', 'jewelery'];

    const handleSelectCategory = (category) => {
        dispatch(fetchProductsByCategory(category));
    };

    return (
        <div className="category-dropdown">
            <select onChange={(e) => handleSelectCategory(e.target.value)}>
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default CategoryDropdown;
