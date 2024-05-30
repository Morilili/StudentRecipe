import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import recipeService from "./recipeService"

const initialState = {
  recipes: [],
  single: [], 
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getRecipes = createAsyncThunk('recipes/getAll',
  async(_, thunkAPI) => {
    try{
      return await recipeService.getRecipes()
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getSingleRecipe = createAsyncThunk('recipes/get',
  async(recipe_id, thunkAPI) => {
    try{
      return await recipeService.getSingleRecipe(recipe_id)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers:{
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recipes = action.payload
        state.single = []
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSingleRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.single = action.payload
        // state.recipes = []
      })
      .addCase(getSingleRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = recipeSlice.actions
export default recipeSlice.reducer
