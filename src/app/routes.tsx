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
        element: (
          <div className="text-white">Gestion des Projets (À venir)</div>
        ),
      },
      {
        path: "events",
        element: (
          <div className="text-white">Gestion des Événements (À venir)</div>
        ),
      },
      {
        path: "rental",
        element: (
          <div className="text-white">Gestion des Locations (À venir)</div>
        ),
      },
      {
        path: "settings",
        element: <div className="text-white">Paramètres (À venir)</div>,
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
