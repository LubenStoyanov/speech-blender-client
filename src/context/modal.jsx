import { createContext, useState } from "react";

export const ModalContext = createContext(); // Consumer

const ModalContextProvider = (props) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showModal, setShowModal] = useState(true);

  return (
    <ModalContext.Provider
      value={{
        showLogin,
        showModal,
        showRegister,
        setShowLogin,
        setShowModal,
        setShowRegister,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
export default ModalContextProvider; // Provider
