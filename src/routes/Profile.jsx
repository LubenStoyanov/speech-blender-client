import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../utils";
import Logout from "./Logout";
import Navbar from "../components/Navbar";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await uploadAvatar();
  } catch (error) {}
};

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  (async () => {
    const verification = await checkToken();
    if (!verification) return navigate("/login");
  })();

  const handleClick = () => setShowModal((s) => true);

  return (
    <>
      <div className="flex justify-between">
        <Navbar />
        <Logout />
      </div>
      <div className="flex flex-col m-4">
        <label
          htmlFor="avatar"
          className="border-1 inline-block p-12 cursor-pointer text-3xl"
        >
          <div className="avatar flex justify-center relative">
            <div className="w-24 rounded-full relative">
              <img src="/public/avatar_pholder.png" />
            </div>
            <button onClick={handleClick}>
              <CiEdit className="absolute left-[52%] top-[-14px]" />
            </button>

            {/* <input
              className="input-file"
              type="file"
              name="avatar"
              id="avatar"
              style={{ display: "none" }}
            /> */}
          </div>
        </label>
        <h1 className="text-3xl text-center m-4">{username} is in da house!</h1>
        <div className="flex justify-center space-x-4">
          <Link to={`/profile/${username}/favorites`}>
            <button
              className="btn border-4 rounded-md border-slate-100 m-2 p-2"
              type="submit"
            >
              Favorites
            </button>
          </Link>
          <Link to={`/profile/${username}/podcasts`}>
            <button
              className="btn border-4 rounded-md border-slate-100 m-2 p-2"
              type="submit"
            >
              Podcasts
            </button>
          </Link>
          <Link to={`/profile/${username}/user-podcasts`}>
            <button
              className="btn border-4 rounded-md border-slate-100 m-2 p-2"
              type="submit"
            >
              Your Podcasts
            </button>
          </Link>
        </div>
        {/* The button to open modal */}
        <label htmlFor="my-modal-6" className="btn">
          open modal
        </label>

        {/* Put this part before </body> tag */}
        {/* <input type="checkbox" id="my-modal-6" className="modal-toggle" /> */}
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal-6" className="btn">
                Yay!
              </label>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
