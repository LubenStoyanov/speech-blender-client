import React from "react";
import {
  useLoaderData,
  Link,
  useParams,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import {
  createPodcast,
  getPodcastsAll,
  deletePodcast,
  likePodcast,
} from "../utils";
import { BsPeople } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";
import { CiMicrophoneOn } from "react-icons/ci";
import { IconContext } from "react-icons";

export const loader = async () => {
  const podcasts = await getPodcastsAll();
  return { podcasts };
};

export const action = async ({ request, params }) => {
  const { username } = params;
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const podcastId = await createPodcast(data);
    console.log("podID", podcastId);
    return redirect(`/profile/${username}/recorder/${podcastId.podcastId}`);
  } catch (error) {
    console.error(error);
  }
};

export default function UserPodcasts() {
  const { podcasts } = useLoaderData() || [];
  const { username } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    const podcastId = e.target.id;
    try {
      await deletePodcast(podcastId);
    } catch (error) {
      console.error(error);
    }
    return navigate(`/profile/${username}/podcasts`);
  };

  const handleLike = async (e) => {
    const podcastId = e.target.id;
    try {
      await likePodcast(podcastId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="my-modal-3"
        className="flex flex-col cursor-pointer rounded-md  m-2 p-2 "
      >
        <IconContext.Provider value={{ size: "50px" }}>
          <CiMicrophoneOn />
          <span className="self-center">Create</span>
        </IconContext.Provider>
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Form method="post" action={`/profile/${username}/podcasts`}>
            <div className="flex justify-center space-x-8">
              <input
                className="text-center"
                type="text"
                placeholder="Title"
                name="title"
              />
              {/* <textarea className="text-center" type="text" placeholder="description" name="description"></textarea> */}
              <button className="btn  rounded-md  m-2 p-2" type="submit">
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>

      {podcasts.map((p) => (
        <div key={p._id}>
          <div className="flex flex-col items-center  rounded-md  m-2 p-2 w-[80ch]">
            <div>
              <div className="flex justify-center">
                <h2 className="text-xl">{p.title}</h2>
              </div>
              <div>
                <audio src={p.url} controls>
                  {p.title}
                </audio>
              </div>
            </div>
            <div className="flex ">
              <div className="text-4xl uppercase">
                <Link to={`/profile/${username}/recorder/${p._id}`}>
                  <button className="btn  rounded-md  m-2 p-2">
                    <IconContext.Provider
                      value={{ color: "white", size: "25" }}
                    >
                      <CiMicrophoneOn />
                    </IconContext.Provider>
                  </button>
                </Link>
              </div>
              <Link to={`/profile/${username}/users/${p._id}`}>
                <button className="btn  rounded-md  m-2 p-2" type="submit">
                  <IconContext.Provider value={{ color: "white", size: "25" }}>
                    <BsPeople />
                  </IconContext.Provider>
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="btn rounded-md  m-2 p-2"
              >
                <IconContext.Provider value={{ color: "white", size: "25" }}>
                  <RiDeleteBin6Line id={p._id} />
                </IconContext.Provider>
              </button>
              <button className="btn  rounded-md  m-2 p-2" onClick={handleLike}>
                <IconContext.Provider value={{ color: "gold", size: "25" }}>
                  <AiOutlineStar id={p._id} />
                </IconContext.Provider>
              </button>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
}
