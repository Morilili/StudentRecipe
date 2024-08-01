import React from 'react'
import { useNavigate } from 'react-router-dom';
import './css/NotFound.css';

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found-root">
      <div className="not-found-label">404</div>
      <h1 className="not-found-title">You have found a secret place.</h1>
      <p className="not-found-description">
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </p>
      <div className="not-found-group">
        <button className="not-found-button" onClick={() => navigate('/')}>
          Take me back to home page
        </button>
      </div>
    </div>
  );
}

export default NotFound