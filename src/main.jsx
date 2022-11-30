import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Register, { action as registerAction } from "./routes/Register";
import Login, { action as loginAction } from "./routes/Login";
import Profile from "./routes/Profile";
import Favorites from "./components/Favorites";
import Logout, { action as logoutAction } from "./routes/Logout";

import Podcasts, { loader as podcastLoader } from "./components/Podcasts";
import ModalContextProvider from "./context/modal";
import Recorder, { action as recordAction } from "./routes/Recorder";
import AWSContextProvider from "./context/aws";
import Users, { loader as usersLoader } from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <div>User already exits.</div>,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/logout",
    element: <Logout />,
    action: logoutAction,
  },
  {
    path: "/profile/:username",
    element: <Profile />,
    children: [
      {
        path: "/profile/:username/recorder",
        element: <Recorder />,
        action: recordAction,
      },
      {
        path: "/profile/:username/favorites",
        element: <Favorites />,
      },
      {
        path: "/profile/:username/podcasts",
        element: <Podcasts />,
        loader: podcastLoader,
      },
      {
        path: "/profile/:username/users",
        element: <Users />,
        loader: usersLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalContextProvider>
      <AWSContextProvider>
        <RouterProvider router={router} />
      </AWSContextProvider>
    </ModalContextProvider>
  </React.StrictMode>
);
