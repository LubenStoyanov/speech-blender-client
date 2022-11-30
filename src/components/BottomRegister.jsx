import React, { useContext } from "react";
import { ModalContext } from "../context/modal";

export default function BottomRegister() {
  const { showModal, setShowModal, setShowLogin, setShowRegister } =
    useContext(ModalContext);
  return (
    <footer
      className={`footer justify-end p-4 bg-neutral text-neutral-content fixed bottom-0 ${
        showModal ? "hidden" : ""
      }`}
    >
      <div className="flex flex-row">
        <button
          onClick={() => {
            setShowLogin((s) => true);
            setShowRegister((s) => false);
            setShowModal((s) => true);
          }}
          className="btn-primary border-2 rounded-md border-slate-100"
        >
          Log in
        </button>
        <button
          onClick={() => {
            setShowRegister((s) => true);
            setShowLogin((s) => false);
            setShowModal((s) => true);
          }}
          className="btn-primary border-2 rounded-md border-slate-100"
        >
          Sign up
        </button>
      </div>
    </footer>
  );
}
