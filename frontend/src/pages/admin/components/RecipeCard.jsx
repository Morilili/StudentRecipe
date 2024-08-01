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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '80vw', 
      padding: '20px', 
      boxSizing: 'border-box', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      margin: '10px 0' 
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%', 
        flexWrap: 'wrap' 
      }}>
        <div style={{ flex: '1 1 100px', marginRight: '20px', marginBottom: '10px' }}>
          <img
            src={`/backend/uploads/${recipe.images[0]}`}
            alt={recipe.name}
            style={{ height: '100px', width: '100px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
        <div style={{ flex: '2 1 200px', marginBottom: '10px' }}>
          <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>{recipe.name}</h3>
        </div>
        <div style={{ flex: '1 1 100px', display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleEditClick}>Edit</button>
          <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={onDeleteRecipe}>Delete</button>
        </div>
      </div>
    </div>
  )
}
export default RecipeCard