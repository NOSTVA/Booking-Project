import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Admin from "./pages/Admin";
import MyAppointments from "./pages/MyAppointments";

import UserContext from "./context/userContext";
import { useGetUserDataQuery } from "./store/api-slice";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { data: user, isLoading, isSuccess, isError } = useGetUserDataQuery();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <></>,
    },
    {
      path: "admin",
      element: <Admin />,
      errorElement: <></>,
    },
    {
      path: "create",
      element: <Create />,
      errorElement: <></>,
    },
    {
      path: "myappointments",
      element: <MyAppointments />,
      errorElement: <></>,
    },
    {
      path: "login",
      element: <Login />,
      errorElement: <></>,
    },
    {
      path: "app/booking/team/signup",
      element: <Signup />,
      errorElement: <></>,
    },
  ]);

  return (
    <UserContext.Provider value={{ user, isLoading, isSuccess, isError }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
