import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withAdminAuth = (Component) => {
  return (props) => {
    // const navigate = useNavigate();
    const  pathname  = window.location.pathname
    const { user } = useSelector((state) => state.auth);

    // Check if user is not admin or the path does not start with '/admin'
    if (user && user.data.role === "Admin" && !pathname.startsWith('/admin')) {
      // Redirect to admin login page or another appropriate page
      
      return window.location.href = '/admin/login'
    }

    // // If user is admin and path starts with '/admin', render the component
    return <Component {...props} />;
  };
};

export default withAdminAuth;