import React, {useEffect, useState} from 'react'
import { deleteReview as delrev } from '../features/reviews/reviewSlice';
import { useSelector, useDispatch } from 'react-redux'

function ReviewCard( {user, review, openModal, closeModal, activeModalId} ) {
  // maybe need change schema to efficiently display the 
  // name of the author of the review
  const dispatch = useDispatch()

  const deleteReview = (e) =>{
    dispatch(delrev(review._id))
    closeModal();
    window.location.reload()
  }

  return (
    <div className='card'>
      {review.body_text}
      <br/><br/>
      <div>
      {activeModalId === review._id && (
        // I am too lazy to get the bounds of the parent window to set the modal in the dead center so this is what im going for
          <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            <dialog style={{zIndex:2}} open>
              <h2>DELETE COMMENT</h2>
              <p>Are you sure you want to delete your comment?</p>
              <button onClick={deleteReview}> Confirm </button>
              <button onClick={closeModal}>Close</button>
            </dialog>
          </div>
        )}

        Posted by: {review.postedByName}

        {/* Idk why the openModal function needs to be in a arrow function */}
        {user ? ( review.postedBy === user.data._id && (
          <button onClick={() => {openModal(review._id)}}>Delete</button>)
        ) : (
          <></>
        )} 
      </div>
    </div>
  )
}

export default ReviewCard