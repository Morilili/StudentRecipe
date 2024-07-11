import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import RecipeCard from '../components/RecipeCard'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getRecipes, reset} from '../features/recipes/recipeSlice';
import Spinner from '../components/Spinner'

function Recipe(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {recipes, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    
    dispatch(getRecipes())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <section className='content'>
        {recipes.data ? (
          <div className='_________'>
            {recipes.data.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))} 
          </div>
        ) : (
          <h3>You have not set any recipes dang
          </h3>
        )}
      </section>
    </div>
  )
}

export default Recipe