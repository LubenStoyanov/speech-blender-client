import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import BottomRegister from "../components/BottomRegister";
export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showModal, setShowModal] = useState(true);

  return (
    <div
      style={{
        display: "",
        columnGap: 15,
      }}
      className="relative"
    >
      <button
        htmlFor="my-modal-3"
        className="btn"
        onClick={() => setShowModal((s) => !s)}
      >
        open modal
      </button>
      <div className="fixed top-0 h-[100vh]"></div>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
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
            <img src="logo-dark.png" alt="logo dark" />
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
      <div className="min-h-[1025rem] bg-red-600">
        <h1 className="text-center top-0 ">TEST</h1>
      </div>
      <BottomRegister />
    </div>
  );
}
