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
import TestimonialSetting from "../pages/admin/Testimonials/index";
import ProtectedRoute from "../components/ProtectedRoute";

const RouteConfig = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Public Routes */}
        <Route path="/" element={<FrontContainer />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="services" element={<Services />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<DashboardContainer />}>
            <Route index element={<Navigate to="banner" replace />} />
            <Route path="banner" element={<BannerSettings />} />
            <Route path="testimonials" element={<TestimonialSetting />} />
          </Route>
        </Route>

        {/* 404 Page */}
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/page-not-found" replace />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
