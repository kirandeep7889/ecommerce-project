import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
    'user/signUp',
    async (userData, { rejectWithValue }) => {
        console.log(userData)

      try {
        const response = await axios.post(`https://ecommerce-project-3smr.onrender.com/api/v1/user/signup`, userData);
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
  
  export const login = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('https://ecommerce-project-3smr.onrender.com/api/v1/user/login', userData);
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
  

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.newUser;
        toast.success("Sign up successful")
        localStorage.setItem('token', action.payload.token); 
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; 
        toast.error("error signing up")
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        toast.success("Login Successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; 
        toast.error("error logging in")
      });
  },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
