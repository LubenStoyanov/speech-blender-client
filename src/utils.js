import axios from "axios";
export const checkToken = async () => {
  try {
    const res = await fetch(
      // "https://speech-blender-backend-production.up.railway.app/profile/asd",
      "http://localhost:8080/profile/asd",
      {
        method: "POST",
        mode: "cors",
        // body: localStorage.getItem("token"),
        credentials: "include",
      }
    );
    return res.ok;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// trying netlify
export const login = async (data) => {
  try {
    const res = await fetch(
      // "https://speech-blender-backend-production.up.railway.app/login",
      "http://localhost:8080/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(data),
      }
    );
    console.log("login", await res.json());
    // localStorage.setItem("token", JSON.stringify(token));
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  console.log("frontend logout");
  try {
    const res = await fetch(
      // "https://speech-blender-backend-production.up.railway.app/logout",
      "http://localhost:8080/logout",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );
    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (data) => {
  try {
    const res = await fetch(
      // "https://speech-blender-backend-production.up.railway.app/register",
      "http://localhost:8080/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const uploadClip = async (data) => {
  try {
    const res = await fetch(
      // "https://speech-blender-backend-production.up.railway.app/uploadClip",
      "http://localhost:8080/uploadClip",
      {
        method: "POST",
        body: data,
        mode: "cors",
        credentials: "include",
      }
    );
    const linkArray = await res.json();
    console.log(linkArray);
    return linkArray;
  } catch (error) {
    console.error(error);
  }
};

export const createPodcast = async (data) => {
  console.log(data);
  try {
    const res = await fetch(
      // "https://speech-blender-backend-production.up.railway.app/podcast/create-podcast",
      "http://localhost:8080/podcast/create-podcast",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include",
      }
    );
    const link = await res.json();
    console.log(link);
    return link;
  } catch (error) {
    console.error(error);
  }
};

export const getPodcasts = async (podcastId) => {
  try {
    const podcastRecordings = await fetch(
      // `https://speech-blender-backend-production.up.railway.app/recording/all/${podcastId}`
      `http://localhost:8080/recording/all/${podcastId}`
    );
    return podcastRecordings;
  } catch (error) {
    console.error(error);
  }
};
