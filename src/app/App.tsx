import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { EditorProvider } from "./context/EditorContext";

function App() {
  return (
    <AuthProvider>
      <EditorProvider>
        <RouterProvider router={router} />
        <Toaster />
      </EditorProvider>
    </AuthProvider>
  );
}

export default App;
