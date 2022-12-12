import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as homeFeedLoader } from "./routes/Root";
import Register, { action as registerAction } from "./routes/Register";
import Login, { action as loginAction } from "./routes/Login";
import Profile, {
  loader as avatarLoader,
  action as avatarAction,
} from "./routes/Profile";
import Favorites, { loader as favoirtesLoader } from "./components/Favorites";
import Logout, { action as logoutAction } from "./routes/Logout";

import Podcasts, {
  loader as podcastLoader,
  action as podcastAction,
} from "./components/Podcasts";
import UserPodcasts, {
  loader as userPodcastLoader,
  action as userPodcastAction,
} from "./components/UserPodcasts";
import ModalContextProvider from "./context/modal";
import Recorder, {
  action as recordAction,
  loader as recordingsLoader,
} from "./routes/ClipsRecorder";
import AWSContextProvider from "./context/aws";
import Users, {
  loader as usersLoader,
  action as collabAction,
} from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeFeedLoader,
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
    action: avatarAction,
    loader: avatarLoader,
    children: [
      {
        path: "/profile/:username/recorder/:podcastId",
        element: <Recorder />,
        action: recordAction,
        loader: recordingsLoader,
      },
      {
        path: "/profile/:username/favorites",
        element: <Favorites />,
        loader: favoirtesLoader,
      },
      {
        path: "/profile/:username/podcasts",
        element: <Podcasts />,
        loader: podcastLoader,
        action: podcastAction,
      },
      {
        path: "/profile/:username/user-podcasts",
        element: <UserPodcasts />,
        loader: userPodcastLoader,
        action: userPodcastAction,
      },
      {
        path: "/profile/:username/users/:podcastId",
        element: <Users />,
        loader: usersLoader,
        action: collabAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ModalContextProvider>
    {/* <AWSContextProvider> */}
    <RouterProvider router={router} />
    {/* </AWSContextProvider> */}
  </ModalContextProvider>
  // </React.StrictMode>
);
