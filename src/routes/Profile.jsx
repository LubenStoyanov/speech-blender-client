import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../utils";
import Logout from "./Logout";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  (async () => {
    const token = await checkToken();
    if (!token) return navigate("/login");
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
      <Outlet />
      <Logout username={username} />
    </div>
  );
}
