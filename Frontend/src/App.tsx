import { Toaster } from "sonner";
import AuthLayout from "./pages/AuthLayout";

const App = () => {
  return (

      <div className="flex h-screen w-screen flex-col">
        <AuthLayout />
        <Toaster richColors position="top-right" />
      </div>

  );
};

export default App;