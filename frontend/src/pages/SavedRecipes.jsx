import React, {useEffect, useState}from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import RecipeCard from '../components/RecipeCard'
import { getRecipes, getSaveRecipe, resetRecipe } from '../features/recipes/recipeSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import NotFound from './NotFound';
import Loader from '../components/Loader'
import Spinner from '../components/Spinner';

const SavedRecipes = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const saved_id = useSelector((state) => state.recipes.usersaved)
  const {recipes, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  )
  
  // should honestly fix this because getting save recipe does
  // not require any recipe but when i implement the api call route
  // require one, too lazy to add another line into the backend route
  // file so here lmao. will fix this if i see this in the future
  useEffect(() => {
    dispatch(getSaveRecipe('lmao'));
  }, []); 

  // inifinite scrolling
  // const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);

  const fetchMoreData = () => {
    dispatch(getRecipes({index: index}))
      .then((res) => {
        res.payload.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };


  useEffect(() => {
    if (saved_id.length > 0  && saved_id.length <= 10 ) {
      setHasMore(false)
      dispatch(getRecipes({ params: saved_id, index: 0 }))
    } else if (saved_id.length > 0){
      dispatch(getRecipes({ params: saved_id, index: 0 }))
    } else {
      setHasMore(false)
    }

    return () => {
      dispatch(resetRecipe())
    }
  }, [saved_id])
  
  if (isLoading || saved_id.length !== 0) {
   return <Spinner/> 
  }
  

  return (
    <>
    {user ? (
      <InfiniteScroll
      dataLength={recipes.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader />}
      scrollThreshold={0.9}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>This is the end. Go save more tasty recipes :p</b>
        </p>
      }>
    <div>
      <h1>Hello {user.data.name}</h1>
      <h3>Here are your saved recipes:</h3>
      <section >
        {recipes && recipes.length > 0 ? (
          <div className='_________'>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))} 
          </div>
        ) : (
          <h3>You have not set saved recipes :{"("}
          </h3>
        )}
      </section>
    </div>
    </InfiniteScroll>
    ) :
    (
      navigate('/notfound')
    )}
    </>
  );
};

export default SavedRecipes;