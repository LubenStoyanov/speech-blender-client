import logoDark from "../../logo-dark.png";
// const imgUrl = new URL("./img.png", import.meta.url).href;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import BottomRegister from "../components/BottomRegister";
import { ModalContext } from "../context/modal";

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
    <div className="flex flex-row justify-center">
      <div className="basis-1/3"></div>
      <div className="basis-1/2 min-h-[1025rem] bg-red-600 ">
        <h1 className="flex text-center top-0 fixed">SEARCH</h1>
      </div>
      <div className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box relative">
          <div
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setShowModal((s) => !s)}
          >
            ✕
          </div>
          <figure>
            <img src={logoDark} alt="logo dark" />
          </figure>
          {showRegister && <Register />}
          {showLogin && <Login />}
          {!showRegister && !showLogin ? (
            <div>
              <Link>
                <button
                  onClick={() => setShowRegister((s) => !s)}
                  style={{
                    backgroundColor: "lightblue",
                  }}
                >
                  Register
                </button>
              </Link>
              <Link>
                <button
                  onClick={() => setShowLogin((s) => !s)}
                  style={{
                    backgroundColor: "lightblue",
                  }}
                >
                  Login
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className="basis-1/3"></div>
      <BottomRegister />
    </div>
  );
}
