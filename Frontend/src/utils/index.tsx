import { NavigateFunction } from "react-router-dom";
import Cookies from "js-cookie";

export const apiUrl = "http://localhost:5000/api";
// export const apiUrl = "https://ndnb.onrender.com/api";
// export const apiUrl = "https://backend.ndnb.com.np/api";

export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem("authToken");
  const getToken = Cookies.get("authToken");
  return authToken !== null && getToken !== null;
};

export const handleSignOut = (navigate: NavigateFunction): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("Id");
  Cookies.remove("authToken", { path: "/" });
  navigate("/login");
};
