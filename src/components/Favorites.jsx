import React from "react";
import { useLoaderData, Link, useParams, useNavigate } from "react-router-dom";
import { getFavorites, unlikePodcast } from "../utils";
import { CiMicrophoneOn } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";

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
    <div className="flex flex-col items-center gap-y-10 rounded-md  mt-20">
      {favorites
        ? favorites.map((p) => (
            <>
              <div className="flex flex-col items-center gap-y-5" key={p._id}>
                <div className="flex justify-center  uppercase">
                  <h2 className="text-xl">{p.title}</h2>
                </div>
                <div>
                  <audio src={p.url} controls>
                    {p.title}
                  </audio>
                </div>
                <div className="flex justify-center">
                  <div className="flex self-center">
                    <Link to={`/profile/${username}/recorder/${p._id}`}>
                      <div className="flex self-center">
                        <button>
                          <IconContext.Provider
                            value={{ color: "white", size: "25px" }}
                          >
                            <CiMicrophoneOn />
                          </IconContext.Provider>
                        </button>
                      </div>
                    </Link>
                  </div>
                  <div className="">
                    <button
                      className="btn  rounded-md  "
                      onClick={handleUnlike}
                      id={`${p._id}`}
                    >
                      <IconContext.Provider
                        value={{ color: "gold", size: "25px" }}
                      >
                        <AiFillStar />
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>
              </div>

              <div className="divider"></div>
            </>
          ))
        : null}
    </div>
  );
}
