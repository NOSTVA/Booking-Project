import React, { useState } from "react";
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
  const { data: user, isLoading } = useGetUserDataQuery();

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
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
