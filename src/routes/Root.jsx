import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Navbar from "../components/Navbar";
import BottomRegister from "../components/BottomRegister";
import { ModalContext } from "../context/modal";
import ReactPlayer from "react-player";
import { getHomeFeed } from "../utils";

export const loader = async () => {
  try {
    const homeFeed = await getHomeFeed();
    return homeFeed;
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const {
    showModal,
    setShowModal,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
  } = useContext(ModalContext);
  const homeFeed = useLoaderData();

  const playPodcast = (_, i = 1) => {
    console.trace();
    if (i === podcastRecordings.length) return;
    const audio = new Audio(podcastRecordings[i].url);
    audio.play();
    audio.addEventListener("ended", () => playPodcast(_, i + 1));
  };

  return (
    <div className="bg-neutral min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="md:text-2xl ">
        <h1 className="text-2xl sm:text-5xl text-center text-white pt-20">
          Welcome to Speech Blender
        </h1>
        <div className="flex flex-row justify-center m-20">
          <ReactPlayer url="https://www.youtube.com/watch?v=QACJitCQI34&ab_channel=SpeechBlender" />
        </div>
      </div>
      <div className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box bg-neutral brightness-200  ">
          <div
            htmlFor="my-modal-3"
            className="btn btn-sm  absolute right-2 top-2 "
            onClick={() => setShowModal((s) => !s)}
          >
            ✕
          </div>
          <figure className="flex flex-col items-center">
            <img className="w-48" src="logo-light.png" alt="logo light" />
            <h2 className="text-3xl text-center text-white pt-2">
              Speech Blender
            </h2>
          </figure>
          <fieldset className="flex justify-center">
            {showRegister && <Register />}
            {showLogin && <Login />}

            {!showRegister && !showLogin ? (
              <div>
                <Link>
                  <button
                    onClick={() => setShowRegister((s) => !s)}
                    className="btn  rounded-md m-3 p-2"
                  >
                    Sign Up
                  </button>
                </Link>
                <Link>
                  <button
                    onClick={() => setShowLogin((s) => !s)}
                    className="btn rounded-md m-3 p-2"
                  >
                    Login
                  </button>
                </Link>
              </div>
            ) : null}
          </fieldset>
        </div>
      </div>

      <div className="basis-1/3"></div>
      <div className="flex flex-col items-center">
        {homeFeed.map((p) => (
          <div key={p._id}>
            <h2>{p.title}</h2>
            <audio src={homeFeed[0]} onEnded={playPodcast} controls></audio>
          </div>
        ))}
      </div>
      <BottomRegister />
    </div>
  );
}
