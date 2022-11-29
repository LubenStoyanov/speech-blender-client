import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useFetcher, Form, useParams } from "react-router-dom";
import { upload } from "../utils";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const audioBlob = await fetch(data.mediabloburl).then((r) => r.blob());

    const audioFile = new File([audioBlob], data.title, { type: "audio/ogg" });
    formData.append("file", audioFile, data.title);
    console.log(audioFile);
    // await upload({ audiofile: audioFile });
    await upload(formData);
  } catch (error) {
    console.error(error);
  }
};

export default function Recorder() {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: "audio/ogg" });
  const { username } = useParams();

  const handleSave = () => clearBlobUrl();

  return (
    <div>
      <Form method="post" action={`/profile/${username}`}>
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" />
        </label>

        <p>{status}</p>
        <audio src={mediaBlobUrl} controls />
        <input
          type="url"
          name="mediabloburl"
          value={mediaBlobUrl || ""}
          hidden
          readOnly
        />
        <button onClick={handleSave} type="submit">
          Save
        </button>
      </Form>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
    </div>
  );
}
