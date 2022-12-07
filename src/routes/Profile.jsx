import React from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  Form,
  useActionData,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { checkToken, uploadAvatar } from "../utils";
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
  console.log("avatar", avatarFile.name);
  const data = Object.fromEntries(formData);
  console.log(data.file);
  try {
    const avatarUrl = await uploadAvatar(newFormData);
    console.log(avatarUrl);
    return avatarUrl;
  } catch (error) {
    console.error(error);
  }
};

export const loader = async () => {
  try {
    const res = await fetch("http://localhost:8080/avatar-image", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const url = await res.json();
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
  }
};

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const url = useLoaderData();
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
            <img src={url?.url || "/public/avatar_pholder.png"} />
          </div>
          <button onClick={() => setShowModal((s) => true)}>
            <IconContext.Provider value={{ color: "white", size: "25px" }}>
              <CiEdit className="absolute left-[52%] top-[-14px]" />
            </IconContext.Provider>
          </button>
        </div>
        <h1 className="text-3xl text-center m-4">{username} is in da house!</h1>
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
