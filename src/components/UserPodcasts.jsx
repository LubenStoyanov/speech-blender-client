import React, { useEffect } from "react";
import axios from "axios";
import {
  useLoaderData,
  Link,
  useParams,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import {
  createPodcast,
  getPodcasts,
  deletePodcast,
  likePodcast,
} from "../utils";

export const loader = async () => {
  try {
    const res = await fetch(
      "https://speech-blender-backend-production.up.railway.app/podcast/user",
      // `${process.env.API_URL}/podcast/user`,
      // "http://localhost:8080/podcast/user",
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );

    const podcasts = await res.json();
    console.log(podcasts);
    return { podcasts };
  } catch (error) {
    console.error(error);
  }
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
  const { username } = useParams();
  const { podcasts } = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    console.log(e.target.id);
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
    <div>
      <label
        htmlFor="my-modal-3"
        className="btn border-4 rounded-md border-slate-100 m-2 p-2 w-32"
      >
        Create New Podcast
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Form method="post" action={`/profile/${username}/podcasts`}>
            <input type="text" name="title" />
            <textarea type="text" name="description"></textarea>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </Form>
        </div>
      </div>

      {podcasts.map((p) => (
        <div key={p._id}>
          {/* <audio src={p.url} key={p.publicId} controls>
            {p.title}
          </audio> */}
          <Link to={`/profile/${username}/recorder/${p._id}`}>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
            <button className="btn border-4 rounded-md border-slate-100 m-2 p-2 w-32">
              Go record
            </button>
          </Link>
          <button onClick={handleDelete} id={p._id} className="btn btn-primary">
            DELETE
          </button>
          <button className="btn btn-primary" id={p._id} onClick={handleLike}>
            Like
          </button>
        </div>
      ))}
    </div>
  );
}
