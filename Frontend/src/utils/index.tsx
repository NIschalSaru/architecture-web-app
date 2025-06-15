import { NavigateFunction } from 'react-router-dom';
import Cookies from 'js-cookie';


// export const apiUrl = "http://localhost:5000/api";
export const apiUrl = "https://ndnb.onrender.com/api";

// Authentication check function
export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem('authToken');
  const getToken=  Cookies.get('authToken');
  return authToken !== null && getToken !== null;
};

export const handleSignOut = (navigate: NavigateFunction): void => {
  // Clear localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  
  // Clear cookies
  Cookies.remove('authToken', { path: '/' });
  
  // Redirect to login
  navigate('/login');
};