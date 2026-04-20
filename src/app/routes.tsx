import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Association from "./pages/Association";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Events from "./pages/Events";
import Join from "./pages/Join";
import Support from "./pages/Support";
import EquipmentRental from "./pages/EquipmentRental";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminRentals from "./pages/admin/AdminRentals";
import AdminSettings from "./pages/admin/AdminSettings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      {
        path: "projects",
        Component: AdminProjects,
      },
      {
        path: "events",
        Component: AdminEvents,
      },
      {
        path: "rental",
        Component: AdminRentals,
      },
      {
        path: "settings",
        Component: AdminSettings,
      },
    ],
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "association", Component: Association },
      { path: "projets", Component: Projects },
      { path: "projets/:id", Component: ProjectDetail },
      { path: "evenements", Component: Events },
      { path: "rejoindre", Component: Join },
      { path: "soutenir", Component: Support },
      { path: "location", Component: EquipmentRental },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
