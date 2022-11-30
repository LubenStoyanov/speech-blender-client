import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Form, json, useActionData, useLoaderData } from "react-router-dom";
import { uploadClip } from "../utils";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const previous = formData.get("podcast");
  const mediabloburl = formData.get("mediabloburl");

  try {
    const audioBlob = await fetch(mediabloburl).then((r) => r.blob());
    const audioFile = new File([audioBlob], title, {
      type: "audio/mp3",
    });

    if (previous) {
      const res = await fetch(previous, {
        method: "GET",
        mode: "cors",
      });
      const s3Blob = await res.blob();

      let blob = new Blob([s3Blob, audioBlob]);
      console.log(blob);

      const blobFile = new File([blob], title, {
        type: "audio/mp3",
      });

      formData.append("file", blobFile, title);
      const podcast = await uploadClip(formData);
      return podcast;
    }

    formData.append("file", audioFile, title);
    const podcast = await uploadClip(formData);

    return podcast;
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
  } = useReactMediaRecorder({ audio: "audio/mp3" });

  const podcast = useActionData();
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
        <input type="url" name="podcast" value={podcast} readOnly hidden />
        <p>{status}</p>
        <button type="submit">Save</button>
      </Form>
      <button className="btn btn-info " onClick={startRecording}>
        Start
      </button>
      <button className="btn btn-info" onClick={pauseRecording}>
        Pause
      </button>
      <button className="btn btn-info" onClick={stopRecording}>
        Stop
      </button>
      <audio src={podcast} controls />
    </div>
  );
}
