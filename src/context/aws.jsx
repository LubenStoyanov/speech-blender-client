import { createContext, useState } from "react";

export const AWSContext = createContext(); // Consumer

const AWSContextProvider = (props) => {
  const [recordingLink, setRecordingLink] = useState("");
  const [podcastLink, setPodcastLink] = useState("");

  return (
    <AWSContext.Provider
      value={{
        recordingLink,
        setRecordingLink,
        podcastLink,
        setPodcastLink,
      }}
    >
      {props.children}
    </AWSContext.Provider>
  );
};
export default AWSContextProvider; // Provider
