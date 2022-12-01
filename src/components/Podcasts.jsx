import React from "react";
import axios from "axios";
import {
  useLoaderData,
  Link,
  useParams,
  Form,
  redirect,
} from "react-router-dom";
import { createPodcast } from "../utils";

export async function loader() {
  const podcasts = await axios
    .get("http://localhost:8080/podcast/all")
    .then((response) => response.data);
  return { podcasts };
}

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const podcastId = await createPodcast(data);
    return redirect(`/profile/${username}/recorder/${podcastId}`);
  } catch (error) {}
};

export default function Podcasts() {
  const { username } = useParams();
  const { podcasts } = useLoaderData();

  return (
    <div>
      <label htmlFor="my-modal-3" className="btn">
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
        <>
          <audio src={p.url} key={p.publicId} controls>
            {p.title}
          </audio>
          <Link to={`/profile/${username}/recorder/${p._id}`}>
            <button className="btn btn-primary">Go record</button>
          </Link>
        </>
      ))}
    </div>
  );
}
