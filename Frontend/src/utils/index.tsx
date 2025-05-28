// import type { GetProp, UploadProps } from 'antd';
import { NavigateFunction } from "react-router-dom";

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// export const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// export const apiUrl = "http://localhost:5000/api";
export const apiUrl = "https://ndnb.onrender.com/api";

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
  const userData = localStorage.getItem("userData");
  return userData !== null;
};

// Logout function
export const handleSignOut = (navigate: NavigateFunction): void => {
  // Clear all localStorage items
  localStorage.clear();
  navigate("/login");
  // Clear specific cookies
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [name] = cookie.trim().split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  }
};
