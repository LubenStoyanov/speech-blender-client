import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../utils";
import Logout from "./Logout";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  (async () => {
    const verification = await checkToken();
    if (!verification) return navigate("/login");
  })();

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="m-4">
        <Logout />
        <div className="avatar flex justify-center">
          <div className="w-24 rounded">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <h1 className="text-3xl text-center m-4">{username} is in da house!</h1>
        <div className="flex justify-center space-x-4">
          <Link to={`/profile/${username}/favorites`}>
            <button
              className="btn border-4 rounded-md border-slate-100 m-2 p-2 w-32"
              type="submit"
            >
              Favorites
            </button>
          </Link>
          <Link to={`/profile/${username}/podcasts`}>
            <button
              className="btn border-4 rounded-md border-slate-100 m-2 p-2 w-32"
              type="submit"
            >
              Podcasts
            </button>
          </Link>{" "}
          <Link to={`/profile/${username}/user-podcasts`}>
            <button
              className="btn border-4 rounded-md border-slate-100 m-2 p-2 w-32"
              type="submit"
            >
              Your Podcasts
            </button>
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
}
