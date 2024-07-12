import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import recipeService from "./recipeService"

const initialState = {
  recipes: [],
  single: [], 
  likes: '',
  usersaved: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getRecipes = createAsyncThunk('recipes/getmult',
  async (params, thunkAPI) => {
    try {
      if (params && params.saved_id) {
        return await recipeService.getRecipes(params.saved_id);
      } else {
        // Fetch all recipes if no category is provided
        return await recipeService.getRecipes();
      }
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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

export const getLikeStatus = createAsyncThunk('recipes/getlikestatus',
  async( {recipe_id}, thunkAPI) => {
    try {
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await recipeService.getLikeStatus(recipe_id, token)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateLikeStatus = createAsyncThunk('recipes/update',
  async( {recipe_id, action}, thunkAPI) => {
    try {
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await recipeService.updateLikeStatus(recipe_id, action, token)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getSaveRecipe = createAsyncThunk('recipes/getSave',
  async(recipe_id, thunkAPI) => {
    try{
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await recipeService.getSaveRecipe(recipe_id, token)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const saveRecipe = createAsyncThunk('recipes/save',
  async(recipe_id, thunkAPI) => {
    try{
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await recipeService.saveRecipe(recipe_id, token)
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
    resetRecipe: (state) => initialState
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
        state.recipes = []
      })
      .addCase(getSingleRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getLikeStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLikeStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // copilot suggest this
        // might be due to the fact the application tries to access before loading causing an error the first time loading a recipe and user in 
        state.likes = action.payload.data?.[0]?.status ?? false;
      })
      .addCase(getLikeStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateLikeStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateLikeStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        // it does not update the state when done the way as in getlikestatus
        // dk why but ig i need to add if statements
        if (state.likes === 'neutral') {
          state.likes = action.payload.data?.[0]?.status ?? false;
        } else { 
          state.likes = 'neutral'
        } 
      })
      .addCase(updateLikeStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(saveRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.usersaved = action.payload.data
      })
      .addCase(saveRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSaveRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSaveRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.usersaved = action.payload.data
      })
      .addCase(getSaveRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { resetRecipe } = recipeSlice.actions
export default recipeSlice.reducer
