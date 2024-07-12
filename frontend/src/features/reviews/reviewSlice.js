import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService"
import { ToastContainer, toast} from 'react-toastify'

const initialState = {
  reviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getReviews = createAsyncThunk('reviews/getAll',
  async({recipe_id, index}, thunkAPI) => {
    try{
      return await reviewService.getReviews(recipe_id, index)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postReview = createAsyncThunk('reviews/post',
  async({data, recipe_id}, thunkAPI) => {
    try{
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await reviewService.postReview(data, recipe_id, token)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteReview = createAsyncThunk('reviews/delete',
  async(review_id, thunkAPI) => {
    try{
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await reviewService.deleteReview(review_id, token)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    resetReview: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reviews = [...state.reviews, ...action.payload.data]
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(postReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // i am force refreshing the page upon submitting a review
        // state.reviews.data.push(action.payload.data)
      })
      .addCase(postReview.rejected, (state, action) => {
        toast.error(action.payload)
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        toast.success(action.payload.message)
        state.isLoading  = false
        state.isSuccess = true
      }) 
      .addCase(deleteReview.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
  }
})

export const {resetReview} = reviewSlice.actions
export default reviewSlice.reducer