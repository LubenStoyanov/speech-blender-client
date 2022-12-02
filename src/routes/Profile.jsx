import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../utils";
import Logout from "./Logout";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const verification = await checkToken();
      if (!verification) return navigate("/login");
    })();
  }, []);

  return (
    <>
      <div className="m-4">
        <Logout />
        <div className="avatar flex justify-center">
          <div className="w-24 rounded">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <h1 className="text-2xl text-center m-4">{username}</h1>
        <div className="flex justify-center space-x-4">
          <Link to={`/profile/${username}/favorites`}>
            <button className="btn btn-primary" type="submit">
              Favorites
            </button>
          </Link>
          <Link to={`/profile/${username}/podcasts`}>
            <button className="btn btn-primary" type="submit">
              Podcasts
            </button>
          </Link>
          <Link to={`/profile/${username}/users`}>
            <button className="btn btn-primary" type="submit">
              Users
            </button>
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
}
