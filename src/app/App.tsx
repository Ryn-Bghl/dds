import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { EditorProvider } from "./context/EditorContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <EditorProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </EditorProvider>
    </AuthProvider>
  );
}

export default App;
