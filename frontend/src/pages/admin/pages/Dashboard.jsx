import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, reset } from '../../../features/auth/authSlice'
import InfoCard from '../components/InfoCard';
import {  getCount as getRecipeCount } from '../../../features/recipes/recipeSlice';
import { getCount as getReviewCount  } from '../../../features/reviews/reviewSlice';

const Dashboard = () => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    width: '100%',
    padding: '16px',
    boxSizing: 'border-box'
  };

  const dispatch = useDispatch()
  const {user, Users, isLoading, isError, message } = useSelector(
    (state) => state.auth
  )
  const recipecount = useSelector(
    (state) => state.recipes.count
  )
  const reviewcount = useSelector(
    (state) => state.reviews.count
  )
  
  if (!isLoading && !isError && Users.length === 0 ) {
    dispatch(getUsers("User"))
    dispatch(getRecipeCount())
    dispatch(getRecipeCount())
  }
  


  return (
    <div style={{ overflow: 'auto', maxHeight: '90vh', width: '100%', maxWidth: '100%' }}>
      <h1>Student Recipe Website Analytics</h1>
      <div className="dashboard-container" style={containerStyle}>
        <InfoCard info={{name: "Number of Active Users: ", value: Users.length}}/>
        <InfoCard info={{name:"Number of Recipes:",value: recipecount}}/>
        <InfoCard info={{name:"Number of Reviews on Recipes: ",value:reviewcount}}/>

      </div>
    </div> 
  );
};

export default Dashboard;