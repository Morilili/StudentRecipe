import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import RecipeCard from '../components/RecipeCard'
import InfiniteScroll from "react-infinite-scroll-component";
import { getRecipes, createRecipe, resetRecipe } from '../../../features/recipes/recipeSlice';
import EditRecipe from '../components/EditRecipe';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../../../components/Spinner';
import Loader from '../../../components/Loader';

function Recipe(){
  const dispatch = useDispatch()
  
  const {recipes, single, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  )

  // For rendering the contents
  const [content, setContent] = useState('display');

  // For the edit portion of the recipes
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const handleEditRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  // Dynamically adds new fields for ingredients and directions as user fills in the alst available field
  const [ingredients, setIngredients] = useState(['']);
  const [directions, setDirections] = useState(['']);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);

    // Automatically add a new field if the user is editing the last ingredient field
    if (index === ingredients.length - 1) {
      setIngredients([...newIngredients, '']);
    }
  };

  const handleDirectionChange = (index, value) => {
    const newDirections = [...directions];
    newDirections[index] = value;
    setDirections(newDirections);

    if (index === directions.length - 1) {
      setDirections([...newDirections, '']);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const recipeName = document.getElementById('recipeName').value;
    const formData = new FormData();
    formData.append('name', recipeName);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    ingredients.filter(ingredient => ingredient.trim() !== '').forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });
    directions.filter(direction => direction.trim() !== '').forEach((direction, index) => {
      formData.append(`directions[${index}]`, direction);
    });

    const response = await dispatch(createRecipe(formData));
    if (response.payload.status === 'success') window.location.reload()
  };



  // images for creating recipe
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    // Convert the FileList to an array and update state
    const files = Array.from(e.target.files);
    setImages(files);
  };



  // inifinite scrolling
  // const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  
  const get = async () => {
    try {
      const response = await dispatch(getRecipes({index: 0}));
      const newRecipes = response.payload.data;

      if (newRecipes.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchMoreData = () => {
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
    
    get()

    return () => {
      dispatch(resetRecipe())
    }
  }, [])


  if (recipes.length == 0 && single.length == 0){
    return <Spinner/>
  }


  // actual content
  const renderContent = () => {
    switch (content) {
      case 'display':
        return (
          <div id="scrollableDiv" className='overflow-auto' style={{ overflow: 'auto', maxHeight: '90vh', width: '100%', maxWidth: '100%' }}>
            <button className='btn btn-primary btn-lg' onClick={() => setContent('create')}>Create New Recipe</button>
            <div style={{ minHeight:  '100vh' }}>
              <InfiniteScroll
                dataLength={recipes.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Loader />}
                scrollThreshold={0.8}
                scrollableTarget="scrollableDiv"
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>- End -</b>
                  </p>
                }
              >
                <section className='content'>
                  {recipes.length > 0 ? (
                    <div className='recipe-list'>
                      {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} onEditRecipe={handleEditRecipe} onEditClick={setContent}/>
                      ))} 
                    </div>
                  ) : (
                    <h3>You have not set any recipes</h3>
                  )}
                </section>
              </InfiniteScroll>
            </div>
          </div>
        );
      case 'create':
        return (
          <div id="scrollableDiv" className='overflow-auto' style={{ overflow: 'auto', maxHeight: '90vh', width: '100%', maxWidth: '100%' }}>
          <div className="create-recipe-form" style={{ width: '100%', maxheight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
            <h2 style={{ marginTop: '20px' }}>Create New Recipe</h2>
            <form onSubmit={handleSubmit} style={{ width: '90%', maxWidth: '600px' }}>
              <div className="form-group">
                <label htmlFor="recipeName">Recipe Name</label>
                <input type="text" className="form-control" id="recipeName" placeholder="Enter recipe name" />
              </div>
              <div className="form-group">
                <label htmlFor="recipeImage">Recipe Image</label>
                <input type="file" className="form-control" id="recipeImage" accept="image/*" multiple onChange={handleImageChange} />
              </div>
              <div className="form-group">
                <label>Ingredients</label>
                {ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                  />
                ))}
              </div>
              <div className="form-group">
                <label>Directions</label>
                {directions.map((direction, index) => (
                  <textarea
                    key={index}
                    className="form-control"
                    value={direction}
                    onChange={(e) => handleDirectionChange(index, e.target.value)}
                    rows="2"
                    placeholder={`Step ${index + 1}`}
                  ></textarea>
                ))}
              </div>
              <button type="button" className="btn btn-secondary" onClick={() => setContent('display')}>Back</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          </div>
        );
      case 'edit':
        return (
          <div>
            {selectedRecipeId && <EditRecipe recipeId={selectedRecipeId} setContent={setContent} />}
          </div>
        );
      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <>{renderContent()}</>
  )
}

export default Recipe