import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async ({ orderData, isLoggedIn }, { rejectWithValue }) => {
    try {
      if (!isLoggedIn) {
        throw new Error("User is not logged in");
      }
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        }
      }
      const response = await axios.post('https://ecommerce-project-3smr.onrender.com/api/v1/orders/', orderData, config);
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

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async ({ userId, isLoggedIn }, { rejectWithValue }) => {
    try {
      if (!isLoggedIn) {
        throw new Error("User is not logged in");
      }
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        }
      }
      const response = await axios.get(`https://ecommerce-project-3smr.onrender.com/api/v1/orders`, config);
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

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default orderSlice.reducer;
