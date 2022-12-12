import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  Form,
  useLoaderData,
} from "react-router-dom";
import { getAvatarImage } from "../utils";
import { uploadAvatar } from "../upload";
import { checkToken } from "../auth";
import React from "react";
import Logout from "./Logout";
import Navbar from "../components/Navbar";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { IconContext } from "react-icons";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const newFormData = new FormData();
  const avatarFile = formData.get("file");
  newFormData.append("file", avatarFile);
  try {
    const url = await uploadAvatar(newFormData);
    return { url };
  } catch (error) {
    console.error(error);
  }
};

export const loader = async () => {
  const url = await getAvatarImage();
  url;
  return url;
};

export default function Profile() {
  const { url } = useLoaderData() || "";
  url;
  const { username } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  (async () => {
    const verification = await checkToken();
    if (!verification) return navigate("/login");
  })();

  return (
    <div className="bg-neutral">
      <div className=" flex justify-between">
        <Navbar />
        <Logout />
      </div>
      <div className="flex flex-col m-4">
        <div className="avatar flex justify-center relative">
          <div className="w-24 rounded-full relative">
            <img src={url || "/avatar_pholder.png"} />
          </div>
          <button onClick={() => setShowModal((s) => true)}>
            <IconContext.Provider value={{ color: "white", size: "25px" }}>
              <CiEdit className="absolute left-[52%] top-[-14px]" />
            </IconContext.Provider>
          </button>
        </div>
        <h1 className="text-3xl text-white text-center m-4">{username}</h1>
        <div className="flex justify-center space-x-4">
          <Link to={`/profile/${username}/favorites`}>
            <button
              className="btn btn-primary brightness-125 rounded-md  m-2 p-2"
              type="submit"
            >
              Favorites
            </button>
          </Link>
          <Link to={`/profile/${username}/podcasts`}>
            <button
              className="btn  btn-primary brightness-125 rounded-md  m-2 p-2"
              type="submit"
            >
              Podcasts
            </button>
          </Link>
          <Link to={`/profile/${username}/user-podcasts`}>
            <button
              className="btn btn-primary brightness-125  rounded-md  m-2 p-2"
              type="submit"
            >
              My Podcasts
            </button>
          </Link>
        </div>

        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div
          className={`modal modal-bottom sm:modal-middle ${
            showModal ? "modal-open" : ""
          }`}
        >
          <div className="modal-box">
            <div
              htmlFor="my-modal-3"
              className="btn btn-sm border-4 absolute right-2 top-2 "
              onClick={() => setShowModal((s) => false)}
            >
              ✕
            </div>
            <Form method="post" encType="multipart/form-data">
              <input
                className="input-file"
                type="file"
                name="file"
                id="avatar"
                accept="image/png, image/jpeg"
                required
                style={{ display: showModal ? "" : "none" }}
              />
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </Form>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
