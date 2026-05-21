import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import AdminBar from "./admin/AdminBar";
import ScrollToTop from "./ScrollToTop";
import { useEditor } from "../context/EditorContext";
import { useAuth } from "../context/AuthContext";
import Maintenance from "../pages/Maintenance";

export default function Layout() {
  const { content } = useEditor();
  const { user } = useAuth();
  const isMaintenance = content.settings.advanced.maintenanceMode;
  const isAdmin = user?.role === "admin";

  // If maintenance mode is on and user is NOT an admin, show maintenance page
  if (isMaintenance && !isAdmin) {
    return <Maintenance />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <AdminBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
