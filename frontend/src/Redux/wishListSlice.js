import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const base_url=import.meta.env.VITE_API_URL;


const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const addItemToWishlist = createAsyncThunk(
  'wishlist/addItemToWishlist',
  async (itemData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token,
          }
        }
      const response = await axios.post(`${base_url}/products/wishlist`, itemData,config);
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

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addItemToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist.push(action.payload);
        toast.success("Item added to wishlist successfully")
      })
      .addCase(addItemToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        toast.error("Error adding to wishlist !! you are not logged in")
      });
  },
});

export default wishlistSlice.reducer;
