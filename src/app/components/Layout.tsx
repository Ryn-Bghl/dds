import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import AdminBar from "./admin/AdminBar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
