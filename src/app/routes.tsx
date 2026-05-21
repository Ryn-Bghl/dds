import { lazy, Suspense, ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Helper to handle ChunkLoadError (common on Vercel after new deploys)
const lazyRetry = (componentImport: () => Promise<{ default: ComponentType<any> }>) => {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      // Check if it's a chunk load error
      if (error instanceof Error && error.message.includes("dynamically imported module")) {
        // Force a page reload to get the latest manifest
        window.location.reload();
      }
      throw error;
    }
  });
};

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C0343]"></div>
  </div>
);

// Lazy load pages with retry logic
const Home = lazyRetry(() => import("./pages/Home"));
const Association = lazyRetry(() => import("./pages/Association"));
const Projects = lazyRetry(() => import("./pages/Projects"));
const ProjectDetail = lazyRetry(() => import("./pages/ProjectDetail"));
const Events = lazyRetry(() => import("./pages/Events"));
const EventDetail = lazyRetry(() => import("./pages/EventDetail"));
const Join = lazyRetry(() => import("./pages/Join"));
const Support = lazyRetry(() => import("./pages/Support"));
const EquipmentRental = lazyRetry(() => import("./pages/EquipmentRental"));
const EquipmentDetail = lazyRetry(() => import("./pages/EquipmentDetail"));
const PackDetail = lazyRetry(() => import("./pages/PackDetail"));
const Contact = lazyRetry(() => import("./pages/Contact"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));
const Login = lazyRetry(() => import("./pages/Login"));

// Admin pages
const AdminLayout = lazyRetry(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazyRetry(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazyRetry(() => import("./pages/admin/AdminProjects"));
const AdminEvents = lazyRetry(() => import("./pages/admin/AdminEvents"));
const AdminRentals = lazyRetry(() => import("./pages/admin/AdminRentals"));
const AdminSettings = lazyRetry(() => import("./pages/admin/AdminSettings"));
const AdminTeam = lazyRetry(() => import("./pages/admin/AdminTeam"));
const AdminMessages = lazyRetry(() => import("./pages/admin/AdminMessages"));
const AdminHelp = lazyRetry(() => import("./pages/admin/AdminHelp"));

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
