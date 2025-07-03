import { NavigateFunction } from "react-router-dom";
import Cookies from "js-cookie";

// export const apiUrl = "http://localhost:5000/api";
// export const apiUrl = "https://ndnb.onrender.com/api";
export const apiUrl = "https://backend.ndnb.com.np/api";

export const isAuthenticated = (): boolean => {
  const localToken = localStorage.getItem("authToken");
  const cookieToken = Cookies.get("authToken");
  return !!(localToken && cookieToken);
};


// export const isAuthenticated = (): boolean => {
//   const authTokenLocal = localStorage.getItem("authToken");
//   const authTokenCookie = Cookies.get("authToken");

//   return Boolean(authTokenLocal && authTokenCookie);
// };


export const handleSignOut = (navigate: NavigateFunction): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("Id");
  Cookies.remove("authToken", { path: "/" });
  navigate("/login");
};
