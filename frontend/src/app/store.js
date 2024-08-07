import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import recipeReducer from "../features/recipes/recipeSlice"
import reviewReducer from "../features/reviews/reviewSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    reviews: reviewReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  })
});
