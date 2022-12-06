import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Form, useLoaderData } from "react-router-dom";
import { uploadClip, getPodcasts } from "../utils";
import { BsRecord2 } from "react-icons/bs";
import { BsStopBtn } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { IconContext } from "react-icons";

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
    console.log("loader", podcastRecordings);
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
  console.log("podcastRecordings", podcastRecordings);

  const playPodcast = (_, i = 1) => {
    console.trace();
    if (i === podcastRecordings.length) return;
    const audio = new Audio(podcastRecordings[i].url);
    audio.play();
    audio.addEventListener("ended", () => playPodcast(_, i + 1));
  };

  return (
    <div className="flex flex-col gap-y-5 mt-32">
      <div className="flex justify-center gap-y-10">
        <button className="btn   " onClick={startRecording}>
          {status === "recording" ? (
            <IconContext.Provider value={{ color: "red", size: "50px" }}>
              <BsRecord2 />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "white", size: "50px" }}>
              <BsRecord2 />
            </IconContext.Provider>
          )}
        </button>
        <button className="btn  " onClick={stopRecording}>
          <IconContext.Provider value={{ color: "white", size: "40px" }}>
            <BsStopBtn />
          </IconContext.Provider>
        </button>
        <div className="flex self-center">
          <Form method="post" encType="multipart/form-data">
            <input
              type="url"
              name="mediabloburl"
              value={mediaBlobUrl}
              readOnly
              hidden
            />
            <button className="btn  rounded-md " type="submit">
              <IconContext.Provider value={{ color: "white", size: "40px" }}>
                <BiSave />
              </IconContext.Provider>
            </button>
          </Form>
        </div>
      </div>
      <div className="flex justify-center">
        <audio
          onEnded={playPodcast}
          src={podcastRecordings.length !== 0 ? podcastRecordings[0].url : ""}
          controls
        />
      </div>
    </div>
  );
}
