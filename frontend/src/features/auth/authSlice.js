import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { useState, useEffect } from 'react'
import { ToastContainer, toast} from 'react-toastify'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user: null,
  isError: false,
  isAuthorized: false, 
  isLoading: false,
  message: ''
};

// Registering User
export const register = createAsyncThunk('auth/register', 
  async(user, thunkAPI) => {
    try{
      return await authService.register(user)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', 
  async(user,thunkAPI) => {
    try{
      return await authService.login(user)
    } catch (error) {
      // const message = (error.response && error.response.data && error.response.data.message) ||
      //   error.message || error.toString()    
      const message = error.response.data.message || error.message

      return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout',
  async(_, thunkAPI) => {
    try{
    // const token = thunkAPI.getState().auth.user.token
    
    return await authService.logout()

    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
  }
})

export const editme = createAsyncThunk('auth/editme',
  async({user_id, userdata}, thunkAPI) => {
    try {
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await authService.editme(user_id, userdata, token)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
})

export const deleteaccount = createAsyncThunk('auth/deleteaccount',
  async(user_id, thunkAPI) => {
    try{
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await authService.deleteaccount(user_id, token)
      } catch (error) {
        const message = error.response.data.message || error.message
        return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isAuthorized = false;
    }
  }, 
  // toast messages are dislayed through useeffect in the respective pages
  // make changes as need in the future
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        toast.success(action.payload.message)
        state.isLoading = false
        state.isAuthorized = true
        state.user = action.payload.data
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        toast.success(action.payload.message)
        state.isLoading = false
        state.isAuthorized = true
        state.user = action.payload.data
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        toast.success(action.payload.message)
        state.isAuthorized = false
        state.user = null
        state.isLoading  = false
      }) 
      .addCase(logout.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
      })
      .addCase(editme.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editme.fulfilled, (state, action) => {
        toast.success(action.payload.message)
        state.isAuthorized = true
        state.user = action.payload
        state.isLoading  = false
      }) 
      .addCase(editme.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deleteaccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteaccount.fulfilled, (state, action) => {
        toast.success(action.payload.message)
        state.isAuthorized = true
        state.user = null
        state.isLoading  = false
      }) 
      .addCase(deleteaccount.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
  },
});

export const { reset } = authSlice.actions
export default authSlice.reducer
