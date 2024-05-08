import React from 'react'
import { useNavigate } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  return (
    // <div className='RecipeCard' onClick={() => {
    //   navigate("/recipes/" + id)
    // }}>
    <div>
      {/* <div style={{backgroundImage: `url(${image})`}} className='bgImage'/>
      <h1 className='projectTitle'>{name}</h1> */}
      {/* <div className="item-card">
            <img src={item.imageUrl} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>${item.price}</span>
        </div> */}
      card
    </div>
  )
}
export default RecipeCard