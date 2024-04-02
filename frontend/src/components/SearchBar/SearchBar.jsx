import React, { useState } from 'react';
import './SearchBar.css'; 
import { fetchProductsBySearch } from '../../Redux/productsSlice';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch=useDispatch();

  const handleSearch = () => {
    dispatch(fetchProductsBySearch(query));
  };

  return (
    <div className="SearchBar"> 
      <input placeholder='Search for a product..' type="text" value={query} onChange={e => setQuery(e.target.value)} className="SearchInput" /> {/* Add the SearchInput class */}
      <button onClick={handleSearch} className="SearchButton">Search</button>
    </div>
  );
};

export default SearchBar;
