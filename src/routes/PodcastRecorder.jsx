import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Form, json } from "react-router-dom";
import { uploadPodcast } from "../utils";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const mediabloburl = formData.get("mediabloburl");

  try {
    const audioBlob = await fetch(mediabloburl).then((r) => r.blob());
    const audioFile = new File([audioBlob], title, {
      type: "audio/mpeg",
    });

    formData.append("file", audioFile, title);
    await uploadPodcast(formData);

    return json({ success: true });
  } catch (error) {
    console.error(error);
  }
};

export default function Recorder() {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: "audio/mpeg" });

  return (
    <div>
      <Form method="post">
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" />
        </label>
        <input
          type="url"
          name="mediabloburl"
          value={mediaBlobUrl}
          readOnly
          hidden
        />
        <p>{status}</p>
        <audio src={mediaBlobUrl} controls />
        <button type="submit">Save</button>
      </Form>
      <button className="btn rounded-md  mt-5 p-2" onClick={startRecording}>
        Start
      </button>
      <button className="btn  rounded-md  mt-5 p-2" onClick={pauseRecording}>
        Pause
      </button>
      <button className="btn  rounded-md  mt-5 p-2" onClick={stopRecording}>
        Stop
      </button>
    </div>
  );
}
