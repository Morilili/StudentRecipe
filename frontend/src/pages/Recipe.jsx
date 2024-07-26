import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import RecipeCard from '../components/RecipeCard'
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast} from 'react-toastify'
import { getRecipes, resetRecipe} from '../features/recipes/recipeSlice';
import Spinner from '../components/Spinner'
import Loader from '../components/Loader'

function Recipe(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {recipes, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  )

  // inifinite scrolling
  // const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  
  // useEffect(() => {
    
  //   // return () => {
  //   //   // dispatch(resetRecipe())
  //   // }
  // }, [])

  const fetchMoreData = () => {
    // dispatch(resetRecipe())
    // dispatch(getRecipes({index: index}))
    // setHasMore(true)
    dispatch(getRecipes({index: index}))
      .then((res) => {
        res.payload.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    
    dispatch(getRecipes({index: 0}))

    return () => {
      // dispatch(getRecipes({index: index}))
      // dispatch(resetRecipe())
    }
  }, [])

  if (recipes.length == 0){
    return <Spinner/>
  }

  return (
    <InfiniteScroll
      dataLength={recipes.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader />}
      scrollThreshold={0.9}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div>
        <section assName='content'>
          {recipes.length > 0 ? (
            <div className='_________'>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))} 
            </div>
          ) : (
            <h3>You have not set any recipes dang
            </h3>
          )}
        </section>
      </div>
    </InfiniteScroll>
  )
}

export default Recipe