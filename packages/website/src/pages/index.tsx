import { RouteObject } from "react-router-dom";

import DefaultLayout from "../components/layout";
import { Home } from "./home";
import { Auth, Logout } from "./auth";
import Login from "./auth/Login";

const securedRouter: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "auth/logout",
        element: <Logout />,
      },
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];
const unsecuredRouter: RouteObject[] = [
  {
    path: "auth",
    element: <Auth />,
    shouldRevalidate: () => {
      const token = localStorage.getItem("jwt") !== null;
      console.log(token);
      return !token;
    },
  },
  {
    path: "auth/login",
    element: <Login />,
  },
];

export { securedRouter, unsecuredRouter };
