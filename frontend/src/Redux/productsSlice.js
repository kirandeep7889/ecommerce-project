import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 const base_url=import.meta.env.VITE_API_URL;



const initialState = {
  products: [],
  wishlistItems: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/products/bulk`);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message }); 
      }
    }
  }
);

export const fetchProductsBySearch = createAsyncThunk(
  'products/fetchProductsBySearch',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/products/search?keyword=${keyword}`);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message }); 
      }
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/products/category/${category}`);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message }); 
      }
    }
  }
);

export const fetchWishlistItems = createAsyncThunk(
  'wishlist/fetchWishlistItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/products/wishlist`);
      return response.data.allWishListItems;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; 
      })
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; 
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; 
      })
      .addCase(fetchWishlistItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; 
      });
  },
});

export default productSlice.reducer;
