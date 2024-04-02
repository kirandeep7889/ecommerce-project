import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const base_url = import.meta.env.VITE_API_URL;

const initialState = {
  addingProduct: false,
  gettingProducts: false,
  editingProduct: false,
  deletingProduct: false,
  products: [],
  error: null,
};

export const addSellerProduct = createAsyncThunk(
  'products/addSellerProduct',
  async (productData, { rejectWithValue, getState }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${base_url}/seller/addProduct`, productData, {
        headers: {
          Authorization: token,
        },
      });
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

export const getSellerProducts = createAsyncThunk(
  'products/getSellerProducts',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${base_url}/seller/displayProduct`, {
        headers: {
          Authorization: token,
        },
      });
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

export const editSellerProduct = createAsyncThunk(
  'products/editSellerProduct',
  async ({ productId, formData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(`${base_url}/seller/editProduct/${productId}`, formData, {
        headers: {
          Authorization: token,
        },
      });
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

export const deleteSellerProduct = createAsyncThunk(
  'products/deleteSellerProduct',
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${base_url}/seller/deleteProduct/${productId}`, {
        headers: {
          Authorization: token,
        },
      });
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

const sellerProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addSellerProduct.pending, (state) => {
        state.addingProduct = true;
      })
      .addCase(addSellerProduct.fulfilled, (state) => {
        state.addingProduct = false;
        toast.success("Product added successfully");
      })
      .addCase(addSellerProduct.rejected, (state, action) => {
        state.addingProduct = false;
        state.error = action.payload.message;
        toast.error("Error adding product");
      })
      .addCase(getSellerProducts.pending, (state) => {
        state.gettingProducts = true;
      })
      .addCase(getSellerProducts.fulfilled, (state, action) => {
        state.gettingProducts = false;
        state.products = action.payload;
      })
      .addCase(getSellerProducts.rejected, (state, action) => {
        state.gettingProducts = false;
        state.error = action.payload.message;
      })
      .addCase(editSellerProduct.pending, (state) => {
        state.editingProduct = true;
      })
      .addCase(editSellerProduct.fulfilled, (state) => {
        state.editingProduct = false;
        toast.success("Product updated successfully");    
      })
      .addCase(editSellerProduct.rejected, (state, action) => {
        state.editingProduct = false;
        state.error = action.payload.message;
        toast.error("Error updating product");
      })
      .addCase(deleteSellerProduct.pending, (state) => {
        state.deletingProduct = true;
      })
      .addCase(deleteSellerProduct.fulfilled, (state) => {
        state.deletingProduct = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteSellerProduct.rejected, (state, action) => {
        state.deletingProduct = false;
        state.error = action.payload.message;
        toast.error("Error deleting product");
      });
  },
});

export default sellerProductSlice.reducer;
