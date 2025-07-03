import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/index';

const ProtectedRoute = () => {
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const status = isAuthenticated();
    setAuth(status);
    setChecked(true);
  }, []);

  if (!checked) return null; // or spinner

  if (!auth) {
    localStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;











// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import {isAuthenticated} from '../utils/index';

// const ProtectedRoute = () => {
//   const location = useLocation();
//   console.log(isAuthenticated());
//   if (!isAuthenticated()) {
//     // Store the attempted path before redirecting
//     localStorage.setItem('redirectPath', location.pathname);
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;






// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { isAuthenticated } from '../utils/index';

// // interface ProtectedRouteProps {
// //   children: React.ReactNode;
// // }

// const ProtectedRoute = () => {
//   const location = useLocation();

//   if (!isAuthenticated()) {
//     // Store the attempted path before redirecting
//     localStorage.setItem('redirectPath', location.pathname);
//     // Redirect to login with the return url
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;