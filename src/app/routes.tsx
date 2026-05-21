import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C0343]"></div>
  </div>
);

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Association = lazy(() => import("./pages/Association"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Join = lazy(() => import("./pages/Join"));
const Support = lazy(() => import("./pages/Support"));
const EquipmentRental = lazy(() => import("./pages/EquipmentRental"));
const EquipmentDetail = lazy(() => import("./pages/EquipmentDetail"));
const PackDetail = lazy(() => import("./pages/PackDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));

// Admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminRentals = lazy(() => import("./pages/admin/AdminRentals"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminHelp = lazy(() => import("./pages/admin/AdminHelp"));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        {withSuspense(AdminLayout)}
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: withSuspense(AdminDashboard) },
      {
        path: "projects",
        element: withSuspense(AdminProjects),
      },
      {
        path: "events",
        element: withSuspense(AdminEvents),
      },
      {
        path: "rental",
        element: withSuspense(AdminRentals),
      },
      {
        path: "messages",
        element: withSuspense(AdminMessages),
      },
      {
        path: "team",
        element: withSuspense(AdminTeam),
      },
      {
        path: "settings",
        element: withSuspense(AdminSettings),
      },
      {
        path: "help",
        element: withSuspense(AdminHelp),
      },
    ],
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "association", element: withSuspense(Association) },
      { path: "projets", element: withSuspense(Projects) },
      { path: "projets/:id", element: withSuspense(ProjectDetail) },
      { path: "evenements", element: withSuspense(Events) },
      { path: "evenements/:id", element: withSuspense(EventDetail) },
      { path: "rejoindre", element: withSuspense(Join) },
      { path: "soutenir", element: withSuspense(Support) },
      { path: "location", element: withSuspense(EquipmentRental) },
      { path: "location/:id", element: withSuspense(EquipmentDetail) },
      { path: "location/pack/:id", element: withSuspense(PackDetail) },
      { path: "contact", element: withSuspense(Contact) },
      { path: "*", element: withSuspense(NotFound) },
    ],
  },
]);
