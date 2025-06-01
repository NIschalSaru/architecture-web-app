import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUsPage from "../pages/client/about";
import FrontContainer from "../pages/client/container";
import PageNotFound from "../pages/client/page-not-found/index";
import Home from "../pages/client/home";
import LoginPage from "../pages/client/auth/login";
import Services from "../pages/client/Service/index";
import Projects from "../pages/client/projects";
import DashboardContainer from "../pages/admin/dashboardContainer";
import BannerSettings from "../pages/admin/Banner/Index";
import TestimonialSetting from "../pages/admin/Testimonials/index";
import ProjectSetting from "../pages/admin/Projects/AddNewProjects/Index";
import ProjectTypeSetting from "../pages/admin/Projects/ProjectTypes/Index";
import ProjectClients from "../pages/admin/Projects/Clients/Index";
import ProtectedRoute from "../components/ProtectedRoute";
import ProjectDetails from "../pages/client/projects/projectDetails";
import CategorizeProjects from "../pages/client/projects/catagorizeProjects";
import AddProject from "../pages/admin/Projects/AddNewProjects/AddProject";
import ClientReqForm from "../pages/admin/ClientRequirementForm/Index";
const RouteConfig = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Public Routes */}
        <Route path="/" element={<FrontContainer />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="services" element={<Services />} />
          {/* <Route path="project/:title" element={<ProjectDetails />} /> */}

          {/* 
          <Route path="/client/:id" element={<ClientDetails />} /> */}
          <Route path="/projects/:id" element={<ProjectDetails />} />
          {/* <Route path="/projects/:id" element={<ProjectDetails />} /> */}
          {/* <Route path="projects/details/:title" element={<ProjectDetails />} /> */}

          <Route path="page-not-found" element={<PageNotFound />} />
          <Route
            path="projects/category/:categoryKey"
            element={<CategorizeProjects />}
          />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<DashboardContainer />}>
            <Route index element={<Navigate to="banner" replace />} />
            <Route path="banner" element={<BannerSettings />} />
            <Route path="testimonials" element={<TestimonialSetting />} />
            <Route
              path="projects-settings/:project_id"
              element={<ProjectSetting />}
            />
            <Route
              path="projects-categories"
              element={<ProjectTypeSetting />}
            />
            <Route path="projects-clients/:id" element={<ProjectClients />} />
            <Route path="add-project/:project_id" element={<AddProject />} />
            <Route path="Client-Requirement-Form" element={<ClientReqForm />} />
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
