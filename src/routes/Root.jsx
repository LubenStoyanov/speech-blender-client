import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Navbar from "../components/Navbar";
import BottomRegister from "../components/BottomRegister";
import { ModalContext } from "../context/modal";
import ReactPlayer from "react-player";

export default function Home() {
  const {
    showModal,
    setShowModal,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
  } = useContext(ModalContext);

  return (
    <>
    <div><Navbar /></div>
      <div className="bg-inherit ">
        <h1 className="text-5xl text-center text-white pt-20">Welcome to Speech Blender</h1>
        <div className="flex flex-row justify-center m-20">
          <ReactPlayer url='https://www.youtube.com/watch?v=QACJitCQI34&ab_channel=SpeechBlender' />
          </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="basis-1/3"></div>
        <div className="basis-1/2 min-h-[1025rem] bg-inherit ">
          <h1 className="text-5xl text-center text-white pt-20">
            Welcome to Speech Blender
          </h1>
          <div className="flex flex-row justify-center m-20">
            <ReactPlayer url="https://www.youtube.com/watch?v=QACJitCQI34&ab_channel=SpeechBlender" />
          </div> 
          <figure>
            <img src="logo-light.png" alt="logo light" />
            <h2 className="text-3xl text-center text-white">Speech Blender</h2>
          </figure>
          <fieldset className="flex justify-center">
          {showRegister && <Register />}
            {showLogin && <Login />}
            
          {!showRegister && !showLogin ? (
            <div>
              <Link>
                <button
                  onClick={() => setShowRegister((s) => !s)}
                  className="btn border-4 rounded-md border-slate-100 m-1 p-2"
                >
                  Sign Up
                </button>
              </Link>
              <Link>
                <button
                  onClick={() => setShowLogin((s) => !s)}
                  className="btn border-4 rounded-md border-slate-100 m-1 p-2"
                >
                  Login
                </button>
              </Link>
            </div>

            <figure className="w-auto">
              <img src="logo-light.png" alt="logo light" />
              <h2 className="text-3xl text-center text-white">
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
                      className="btn border-4 rounded-md border-slate-100 m-10 p-2 w-32"
                    >
                      Sign Up
                    </button>
                  </Link>
                  <Link>
                    <button
                      onClick={() => setShowLogin((s) => !s)}
                      className="btn border-4 rounded-md border-slate-100 m-10 p-2 w-32"
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
        <BottomRegister />
      </div>
  );
}
