import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../services/ApiEndpoint';

// Thunk to check user
export const updateUser = createAsyncThunk('updateuser', async () => {
  try {
    const request = await get('/api/auth/CheckUser');
    const response = request.data;  // Assuming the response is the user data
    return response;
  } catch (error) {
    throw error;  // Rethrow to handle it in the rejected case
  }
});

// Initial state
const initialState = {
  loading: false,  // Initialize loading as false
  error: null,
  user: null,
};

// Slice definition
const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    // Action to set user manually
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    // Action to logout (clear user data)
    Logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;  // Set loading to true when the async action starts
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;  // Set loading to false when the request is successful
        state.user = action.payload;  // Store the user data in state
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;  // Set loading to false if the request fails
        state.error = action.error.message;  // Store the error message in state
        state.user = null;  // Optionally clear user data on error
      });
  },
});

export const { SetUser, Logout } = AuthSlice.actions;

export default AuthSlice.reducer;
