import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const getPodcast = await axios
    .get("http://localhost:8080/podcast/all")
    .then((response) => response.data);
  return { getPodcast };
}

export const loader = async ({ params }) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export default function Podcasts() {
  const { getPodcast } = useLoaderData();

  return (
    <>
      {getPodcast.map((p) => (
        <div>{p.title}</div>
      ))}
    </>
  );
}
