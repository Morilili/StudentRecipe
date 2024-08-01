import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import recipeService from "./recipeService"
import { toast } from 'react-toastify'
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
  async ({params, index}, thunkAPI) => {
    try {
      if (params && params.length > 0) {
        return await recipeService.getRecipes(params, index)
      } else {
        // Fetch all recipes if no category is provide
        return await recipeService.getRecipes([], index);
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

export const updateLikeStatus = createAsyncThunk('recipes/updatelikes',
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

export const createRecipe = createAsyncThunk('recipes/create',
  async(recipedata, thunkAPI) => {
    try{
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await recipeService.createRecipe(recipedata, token)
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

export const updateRecipe = createAsyncThunk('recipes/update',
  async({recipe_id, recipedata}, thunkAPI) => {
    try{
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await recipeService.updateRecipe(recipe_id, recipedata, token)
    } catch (error) {
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteRecipe = createAsyncThunk('recipes/delete',
  async(recipe_id, thunkAPI) => {
    try{
      
      const token = thunkAPI.getState.apply().auth.user.data.token
      return await recipeService.deleteRecipe(recipe_id, token)
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
        //had some issues with the saved recipes of how it runs twice in the useeffect
        //this ensures all the recipes in the state.recipes is unique before adding in
        //more like a hacking solution?
        const newRecipes = action.payload.data.filter(newRecipe => 
          !state.recipes.some(existingRecipe => existingRecipe._id === newRecipe._id))
        
        state.recipes = [...state.recipes, ...newRecipes]
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
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        toast.success(action.payload.message)
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createRecipe.rejected, (state, action) => {
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
      .addCase(updateRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        toast.success(action.payload.message)
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { resetRecipe } = recipeSlice.actions
export default recipeSlice.reducer
