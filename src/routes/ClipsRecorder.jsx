import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { uploadClip, getPodcasts } from "../utils";

export const action = async ({ request, params }) => {
  const { podcastId } = params;
  const formData = await request.formData();
  const mediabloburl = formData.get("mediabloburl");
  const newFormData = new FormData();

  try {
    const audioBlob = await fetch(mediabloburl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "file", {
      type: "audio/mp3",
    });

    newFormData.append("file", audioFile);
    newFormData.append("podcastId", podcastId);
    const podcast = await uploadClip(newFormData);
    console.log(podcast);

    return podcast;
  } catch (error) {
    console.error(error);
  }
};

export const loader = async ({ params }) => {
  try {
    const { podcastId } = params;
    const res = await getPodcasts(podcastId);
    const podcastRecordings = await res.json();
    return podcastRecordings;
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

  const podcastRecordings = useLoaderData() || [];

  const playPodcast = (_, i = 1) => {
    if (i === podcastRecordings.length) return;
    const audio = new Audio(podcastRecordings[i].url);
    audio.play();
    audio.addEventListener("ended", () => playPodcast(_, i + 1));
  };

  return (
    <div>
      <Form method="post" encType="multipart/form-data">
        <input
          type="url"
          name="mediabloburl"
          value={mediaBlobUrl}
          readOnly
          hidden
        />
        <p>{status}</p>
        <button type="submit">Save</button>
      </Form>
      <button className="btn btn-info" onClick={startRecording}>
        Start
      </button>
      <button className="btn btn-info" onClick={pauseRecording}>
        Pause
      </button>
      <button className="btn btn-info" onClick={stopRecording}>
        Stop
      </button>
      <audio
        onEnded={playPodcast}
        src={podcastRecordings.length !== 0 ? podcastRecordings[0].url : ""}
        controls
      />
    </div>
  );
}
