import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Admin from "./pages/Admin";
import MyAppointments from "./pages/MyAppointments";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "admin",
      element: <Admin />,
    },
    {
      path: "create",
      element: <Create />,
    },
    {
      path: "myappointments",
      element: <MyAppointments />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
