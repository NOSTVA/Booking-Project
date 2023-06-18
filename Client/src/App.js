import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
