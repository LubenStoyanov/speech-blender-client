import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useFetcher, Form, useParams, useNavigate } from "react-router-dom";
import { upload } from "../utils";

export default function Recorder() {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: "audio/mpeg" });
  const [linkAWS, setLinkAWS] = useState("");
  // const { username } = useParams();
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    try {
      const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());

      const audioFile = new File([audioBlob], title, {
        type: "audio/mpeg",
      });
      const formData = new FormData();
      formData.append("file", audioFile, title);
      console.log(audioFile);
      const link = await upload(formData);
      setLinkAWS((l) => link);
    } catch (error) {
      console.error(error);
    }
    clearBlobUrl();
    // navigate(`/profile/${username}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" />
        </label>
        <p>{status}</p>
        <audio src={mediaBlobUrl} controls />
        <button type="submit">Save</button>
      </form>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      <h2>Test recording</h2>
      <audio src={`${linkAWS}`} controls>
        Test
      </audio>
    </div>
  );
}
