import { createContext, useState } from "react";

export const ModalContext = createContext(); // Consumer

const ModalContextProvider = (props) => {
  const [recordingLink, setRecordingLink] = useState("");
  const [podcastLink, setPodcastLink] = useState("");

  return (
    <ModalContext.Provider
      value={{
        recordingLink,
        setRecordingLink,
        podcastLink,
        setPodcastLink,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
export default ModalContextProvider; // Provider
