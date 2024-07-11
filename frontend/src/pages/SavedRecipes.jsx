import React, {useEffect, useState}from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import RecipeCard from '../components/RecipeCard'
import { getRecipes, getSaveRecipe } from '../features/recipes/recipeSlice';
import Spinner from '../components/Spinner'
const SavedRecipes = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const saved_id = useSelector((state) => state.recipes.usersaved)
  const {recipes, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  )
  
  // should honestly fix this because getting save recipe does
  // not require any recipe but when i implement the api call route
  // require one, too lazy to add another line into the backend route
  // file so here lmao. will fix this if i see this in the future
  useEffect(() => {
    dispatch(getSaveRecipe('lmao'));
  }, []); 

  useEffect(() => {
    if (saved_id.length != 0 ) {
      dispatch(getRecipes({ saved_id }))
    }
  }, [saved_id])
  
  if (isLoading) {
    return <Spinner/>
  }

  return (
    <div>
      <h1>Hello {user.data.name}</h1>
      <h3>Here are your saved recipes:</h3>
      <section className='content'>
        {recipes && recipes.data ? (
          <div className='_________'>
            {recipes.data.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))} 
          </div>
        ) : (
          <h3>You have not set saved recipes :{"("}
          </h3>
        )}
      </section>
    </div>
  );
};

export default SavedRecipes;