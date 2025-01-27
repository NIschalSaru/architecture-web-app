// import type { GetProp, UploadProps } from 'antd';
import { NavigateFunction } from 'react-router-dom';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// export const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

export const apiUrl = "http://localhost:5000/api";

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('token');
};

export const handleSignOut = (navigate: NavigateFunction) => {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  navigate('/');
};


export const isAuthenticated = () => {
  const cookies = document.cookie.split(';');
  const hasAuthCookie = cookies.some(cookie => {
      const [name, value] = cookie.trim().split('=');
      return name === 'authToken';
  });
  return hasAuthCookie;
};

// utils/auth.ts
// export const isAuthenticated = () => {
//   // First check for the auth cookie
//   const cookies = document.cookie.split(';');
//   const hasAuthCookie = cookies.some(cookie => 
//     cookie.trim().startsWith('authToken=') 
//     //|| cookie.trim().startsWith('connect.sid=') // Add any other possible cookie names
//   );
//   // Also check for user data in storage as backup
//   // const hasUserData = localStorage.getItem('user') || sessionStorage.getItem('user');

//   return hasAuthCookie;
// };

// Clear auth data on logout
export const clearAuth = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
  // You might want to also call your logout API endpoint here
};
