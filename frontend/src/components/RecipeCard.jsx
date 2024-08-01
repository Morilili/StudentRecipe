import React, { useEffect, useState } from 'react'
import { useNavigate, useRevalidator } from 'react-router-dom';
import { useDispatch } from 'react-redux'


function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onClick = () => {
    navigate("/recipes/" + recipe._id)
  }
  return (
    <div className='card' onClick={onClick}>
      <div>
        <div className='bgImage'/>
          <img           
            src={`/backend/uploads/${recipe.images[0]}`}
            height={300}
            width={300}
          />
          <h3>{recipe.name}</h3>
      </div>
    </div>
  )
}
export default RecipeCard