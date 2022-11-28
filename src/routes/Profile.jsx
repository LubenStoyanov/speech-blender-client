import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Recorder from "../routes/Recorder";
import { checkToken } from "../utils";
import Logout from "./Logout";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  (async () => {
    const verification = await checkToken();
    if (!verification) return navigate("/login");
  })();

  return (
    <div>
      <h1>{username}</h1>
      <Link to={`/profile/${username}/favorites`}>
        <button type="submit">Favorites</button>
      </Link>
      <Link to={`/profile/${username}/podcasts`}>
        <button type="submit">Podcasts</button>
      </Link>
      {/* <Recorder /> */}
      <Outlet />
      <Logout username={username} />
    </div>
  );
}
