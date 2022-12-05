import React from "react";
import { useLoaderData, Link, useParams, useNavigate } from "react-router-dom";
import { getFavorites, unlikePodcast } from "../utils";

export const loader = async () => {
  try {
    const favorites = await getFavorites();
    return favorites;
  } catch (error) {
    console.error(error);
  }
};

export default function Favorites() {
  const favorites = useLoaderData();
  const { username } = useParams();
  const navigate = useNavigate();

  const handleUnlike = async (e) => {
    const podcastId = e.target.id;
    try {
      await unlikePodcast(podcastId);
      navigate(`/profile/${username}/favorites`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {favorites.map((p) => (
        <div key={p._id}>
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <Link to={`/profile/${username}/recorder/${p._id}`}>
            <button className="btn border-4 rounded-md border-slate-100 m-2 p-2 w-32">
              Go record
            </button>
          </Link>
          <button
            className="btn border-4 rounded-md border-slate-100 m-2 p-2 w-32"
            onClick={handleUnlike}
            id={`${p._id}`}
          >
            Unlike
          </button>
          {/* <button
              onClick={handleDelete}
              id={p._id}
              className="btn btn-primary"
            >
              DELETE
            </button> */}
          {/* <button className="btn btn-primary" id={p._id} onClick={handleLike}>
              Like
            </button> */}
        </div>
      ))}
    </div>
  );
}
