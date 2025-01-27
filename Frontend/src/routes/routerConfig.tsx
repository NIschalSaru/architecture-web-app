import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUsPage from "../pages/client/about";

import FrontContainer from "../pages/client/container";
import PageNotFound from "../pages/client/page-not-found";
import Home from "../pages/client/home";
import LoginPage from "../pages/client/auth/login";
import Services from "../pages/client/Service/index";
import Projects from "../pages/client/projects";
import DashboardContainer from "../pages/admin/dashboardContainer";
import BannerSettings from "../pages/admin/Banner/Index";
import ProjectDetails from "../pages/client/projects/projectDetails";
// import ProtectedRoute from "../components/ProtectedRoute";

const RouteConfig = () => {
  // console.log(isAuthenticated());
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/*<Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/changePassword" element={<ChangePasswordPage />} /> */}

        <Route path="/" element={<FrontContainer />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route path="/admin" element={<DashboardContainer />}>
                  <Route index element={<Navigate to="banner" replace />} />
                  <Route 
                    path="banner" 
                    element={
                      // <ProtectedRoute>
                        <BannerSettings />
                      // </ProtectedRoute>
                    } 
                  />
                  {/* Add other protected routes as needed */}
                </Route>
        <Route path="/page-not-found" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
