import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

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
  ]);

  return (
    <Body>
      <RouterProvider router={router} />
    </Body>
  );
}

export default App;
