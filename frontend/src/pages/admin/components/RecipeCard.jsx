import React, { useEffect, useState } from 'react'
import { useNavigate, useRevalidator } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getRecipes,deleteRecipe, resetRecipe } from '../../../features/recipes/recipeSlice';

function RecipeCard({ recipe, onEditRecipe, onEditClick  }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleEditClick = () => {
    onEditRecipe(recipe._id);
    onEditClick('edit')
  };

  const onDeleteRecipe = async() => { 
    const reponse = await dispatch(deleteRecipe(recipe._id))
    window.location.reload()
  }
  return (
    <div className='card' style={{ width: '70vw', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div className='bgImage'/>
          <img           
            src={`/backend/uploads/${recipe.images[0]}`}
            height={100}
            width={100}
          />
          <h3>{recipe.name}</h3>
          <div>
            <button className='btn btn-secondary' onClick={handleEditClick}>Edit</button>
            <button className='btn btn-primary' onClick={onDeleteRecipe}>Delete</button>
          </div>
      </div>
    </div>
  )
}
export default RecipeCard