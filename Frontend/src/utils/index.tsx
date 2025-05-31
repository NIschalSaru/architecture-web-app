// import type { GetProp, UploadProps } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import Cookies from 'js-cookie';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// export const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

export const apiUrl = "https://ndnb.onrender.com/api";
// export const apiUrl = "http://localhost:5000/api";

// export const getTokenFromLocalStorage = (): string | null => {
//   return localStorage.getItem('token');
// };

// export const handleSignOut = (navigate: NavigateFunction) => {
//   localStorage.removeItem('username');
//   localStorage.removeItem('token');
//   navigate('/');
// };


// Authentication check function
export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem('authToken');
  const getToken=  Cookies.get('authToken');
  return authToken !== null && getToken !== null;
};

// // Logout function
// export const handleSignOut = (navigate: NavigateFunction): void => {
//   // Clear all localStorage items
//   localStorage.clear();
//   navigate("/login");
//   // Clear specific cookies
//   const cookies = document.cookie.split(';');
  
//   for (let cookie of cookies) {
//     const [name] = cookie.trim().split('=');
//     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
//   }
// };


// utils/auth.ts

// export default (): boolean => {
//   const token = localStorage.getItem('authToken') || Cookies.get('authToken');

//   if (!token) {
//     return false;
//   }

//   try {
//     // Decode the JWT token to check expiration
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds


//     // Check if token is expired
//     if (payload.exp && payload.exp < currentTime) {
//       // Token is expired, clear it
//       localStorage.removeItem('authToken');
//       Cookies.remove('authToken', { path: '/' });
//       localStorage.removeItem('userData');
//       return false;
//     }

//     return true;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return false;
//   }
// };

export const handleSignOut = (navigate: NavigateFunction): void => {
  // Clear localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  
  // Clear cookies
  Cookies.remove('authToken', { path: '/' });
  
  // Redirect to login
  navigate('/login');
};