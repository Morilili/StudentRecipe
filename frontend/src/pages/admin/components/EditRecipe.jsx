import React, { useState, useEffect } from 'react';
import recipeService from '../../../features/recipes/recipeService';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRecipe, updateRecipe } from '../../../features/recipes/recipeSlice';

const EditRecipe = ({ recipeId, setContent }) => {
  const dispatch = useDispatch()
  const { single } = useSelector((state) => state.recipes)

  const [recipe, setRecipe] = useState({
    name: '',
    images: [],
    ingredients: [],
    directions: [],
    
    // Add other fields as necessary
  });

  useEffect(() => {
    dispatch(getSingleRecipe(recipeId))    
  }, []);

  useEffect(() => {
    if (single && single.data) {
      setRecipe({
        name: single.data.name,
        images: single.data.images,
        ingredients: [...single.data.ingredients, ''],
        directions: [...single.data.directions, ''],
        // Add other fields as necessary
      });
    }
  }, [single]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setRecipe(prevRecipe => ({
        ...prevRecipe,
        images: [...files],
    }));
  };  

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients,
    }));

    // Automatically add a new field if the user is editing the last ingredient field
    if (index === recipe.ingredients.length - 1) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: [...newIngredients, ''],
      }));
    }
  };

  const handleDirectionsChange = (index, value) => {
    const newDirections = [...recipe.directions];
    newDirections[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      directions: newDirections,
    }));

    // Automatically add a new field if the user is editing the last ingredient field
    if (index === recipe.directions.length - 1) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        directions: [...newDirections, ''],
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', recipe.name);
      recipe.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      recipe.ingredients.filter(ingredient => ingredient.trim() !== '').forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient);
      });
      recipe.directions.filter(direction => direction.trim() !== '').forEach((direction, index) => {
        formData.append(`directions[${index}]`, direction);
      });
    
      const response = await dispatch(updateRecipe({recipe_id: recipeId, recipedata: formData} ))
      if (response.payload.status === 'success') window.location.reload()
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <>
    {single.data && <div id="scrollableDiv" className='overflow-auto' style={{ overflow: 'auto', maxHeight: '90vh', width: '76vw', maxWidth: '100%' }}>
      <div className="edit-recipe-form" style={{ width: '100%', maxheight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        <h2 style={{ marginTop: '20px' }}>Edit Recipe {single.data.name}</h2>
        <form onSubmit={handleSubmit} style={{ width: '90%', maxWidth: '600px' }}>
          <div className="form-group">
            <label htmlFor="recipeName">Recipe Name</label>
            <input
                  type="text"
                  className="form-control"
                  id="recipeName"
                  placeholder="Enter recipe name"
                  value={recipe.name}
                  onChange={handleChange}
                />
          </div>
          <div className="form-group">
                <label htmlFor="recipeImage">Add Recipe Image{'('}s{')'}</label>
                <input type="file" className="form-control" id="recipeImage" accept="image/*" multiple  onChange={handleImageChange} />
              </div>
          <div className="form-group">
          <br></br>
          <ul>
                {single.data.images && single.data.images.map((image, index) => (
                    <li key={index} style={{ marginRight: '10px' }}>
                        <p style={{ display: 'inline' }}>{image.split(' ')[0]}</p>
                    </li>
                ))}
            </ul>
            <label>Ingredients</label>
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
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
            {recipe.directions && recipe.directions.map((direction, index) => (
              <textarea
                key={index}
                className="form-control"
                value={direction}
                onChange={(e) => handleDirectionsChange(index, e.target.value)}
                rows="2"
                placeholder={`Step ${index + 1}`}
              ></textarea>
            ))}
          </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>}
    </>
  );
};

export default EditRecipe;