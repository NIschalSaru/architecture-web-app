import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUsPage from "../pages/about";

import FrontContainer from "../pages/container";
import PageNotFound from "../pages/page-not-found";
import Home from "../pages/home";
import LoginPage from "../pages/auth/login";
import Services from "../pages/Service/services";

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
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* <Route element={<DashboardContainer />}>
          <Route path="/admin" element={<ProtectedRoute  />}>
            <Route path="/admin/banner" element="" />
            <Route
              path="/admin/testimonials"
              element={<TestimonialSettings />}
            />
             <Route path="/admin/partners" element={<PartnerSettings />} />
            <Route path="/admin/about" element={<AdminAboutUsForm />} />
            <Route path="/admin/gallery" element={<AdminGalleryForm />} /> 
             <Route path="/admin/user" element={<Users />} /> 
            <Route
              path="/admin"
              element={<Navigate to="/admin/banner" replace />}
            />
            <Route path="*" element={<Navigate to="/admin/banner" replace />} />
          </Route>
        </Route> */}
        <Route path="/page-not-found" element={<PageNotFound/>} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
