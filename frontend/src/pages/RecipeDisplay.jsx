import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { ToastContainer, toast} from 'react-toastify'
import { getSingleRecipe, updateLikeStatus, reset, saveRecipe, getLikeStatus, getSaveRecipe} from '../features/recipes/recipeSlice';
import { getReviews, postReview } from '../features/reviews/reviewSlice';
import Spinner from '../components/Spinner'

function RecipeDisplay() {
  const { user } = useSelector((state) => state.auth)
  const { recipe_id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const likes = useSelector((state) => state.recipes.likes)
  const saved = useSelector((state) => state.recipes.usersaved)

  // Responsible for the saved recipes

  useEffect(() => {
    dispatch(getSaveRecipe(recipe_id))
  }, [])

  const handleSaveRecipe = () => {
    dispatch(saveRecipe(recipe_id))
  }

  const isSaved = saved.includes(recipe_id)



  //responsible for the liking funciton of each recipe
  const [likeStatus, setLikeStatus] = useState(likes);

  useEffect(()=> {
    dispatch(getLikeStatus({recipe_id: recipe_id}))
  }, [likeStatus])

  const handleLike = () => { 
    if (likes === 'disliked') {
      return
    } 

    const action = likeStatus === 'true' ? 'neutral' : 'liked'
    setLikeStatus(likeStatus === 'true' ? null : 'true');
    dispatch(updateLikeStatus({recipe_id: recipe_id, action: action}))
    
  };

  const handleDislike = () => {
    if (likes === 'liked') {
      return
    } 
    const action = likeStatus === 'false' ? 'neutral' : 'disliked'
    setLikeStatus(likeStatus === 'false' ? null : 'false');
    dispatch(updateLikeStatus({recipe_id: recipe_id, action: action}))
  };




  // managing the review form 
  const [formData, setFormData] = useState({
    body_text: '',
  })

  const {body_text} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    if (!body_text || body_text.trimStart().length<1) return

    const postdata = {body_text}
    const post = await dispatch(postReview({data: postdata, recipe_id: recipe_id}))

    if (!post.error) {
      window.location.reload()
      setFormData({ body_text: '' })
    }
  }



  // handle the page after opening to modal to delete a review
  const [activeModalId, setActiveModalId] = useState(null);

  const openModal = (id) => {
    setActiveModalId(id);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };
  
  const handleReviewDelete = () => {
    // Code to refresh reviews or handle the state change
    console.log('Review was deleted. Refreshing reviews...');
  };





  //main state handling
  const {single, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  )

  const { reviews } = useSelector(
    (state) => state.reviews
  )

  useEffect(() => {
    if (isError){
      toast.error(message)
    }
    
    dispatch(getSingleRecipe(recipe_id))
    dispatch(getReviews(recipe_id))

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])



  //simplifying the jsx
  const recipe = single.data

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {activeModalId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2, // Ensure it's above other content
        }}>
        </div>
      )}
      <h1>{recipe && recipe.name}</h1>
      {recipe && recipe.images.map((image, index) => (
              <img key={index}
              src={`/backend/uploads/${image}`}
              height={100}
              width={100}></img>
            ))} 
      {user && 
        <div>
          <button onClick={handleLike} style={{ backgroundColor: likes ===  'liked' ? 'green' : 'grey' }}>Like</button>
          <button onClick={handleDislike} style={{ backgroundColor: likes === 'disliked' ? 'red' : 'grey' }}>Dislike</button>
          <button onClick={handleSaveRecipe} style={{ backgroundColor: isSaved ? 'yellow' : '' }}>{isSaved ? '☆ Saved' : 'Save Recipe'}</button>
        </div>
      }
      <div>
        <h3>Ingredients</h3>
        <ul>
          {recipe && recipe.ingrediants.map((ingrediant, index) => (
            <li key={index}>{ingrediant}</li>
          ))}
        </ul>
        <h3>Directions</h3>
        <ol>
          {recipe && recipe.directions.map((direction, index) => (
            <li key={index}>{direction}</li>
          ))}
        </ol>
      </div>
      <div>



      <h3>Reviews</h3>
        {user ? (
            <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <textarea
                  type='text'
                  className='form-control'
                  rows="4"
                  id='body_text'
                  name='body_text'
                  value={body_text}
                  placeholder='What did you think about this recipe? Do you have any suggestions?'
                  onChange={onChange}
                />
              </div>
    
              <div className='form-group'>
                <button type="button" onClick={() => {setFormData({ body_text: '' })}} className='.btn btn-block'>
                  Cancel
                </button>
                <button  className='.btn btn-block'>
                  Submit
                </button>
              </div>
            </form>
          </section>
          ) : (
            <button type="button" class="btn btn-primary btn-lg" onClick={() => {navigate('/login')}}>
              Add your own review today!
            </button>
          )
        }
        
        {reviews.data && reviews.data.length > 0 ? (
          <div>
          {reviews.data.map((review) => (
            <ReviewCard key={review.id} user={user} review={review} recipe_id={recipe_id} onReviewDelete={handleReviewDelete} openModal={openModal} closeModal={closeModal} activeModalId={activeModalId}/>
          ))}
          </div>
          ) : (
            <h5> No reviews have been left for this recipe</h5>
          )
        }
      </div>
    </div>
  )
}

export default RecipeDisplay