import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const podcasts = await axios
    .get("http://localhost:8080/podcast/all")
    .then((response) => response.data);
  return { podcasts };
}

export default function Podcasts() {
  const { podcasts } = useLoaderData();

  return (
    <div>
      {podcasts.map((p) => (
        <audio src={p.url} key={p.publicId} controls>
          {p.title}
        </audio>
      ))}
    </div>
  );
}
