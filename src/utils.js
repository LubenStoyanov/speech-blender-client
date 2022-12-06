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
    const podcastId = await res.json();
    console.log(podcastId);
    return podcastId;
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

export const deletePodcast = async (podcastId) => {
  try {
    await fetch(`http://localhost:8080/podcast/delete/${podcastId}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  }
};

export const likePodcast = async (podcastId) => {
  try {
    await fetch(`http://localhost:8080/favorite/create-favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ podcastId: podcastId }),
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  }
};

export const unlikePodcast = async (podcastId) => {
  try {
    const res = await fetch("http://localhost:8080/favorite/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ podcastId: podcastId }),
      mode: "cors",
      credentials: "include",
    });

    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

export const getFavorites = async () => {
  try {
    const res = await fetch(`http://localhost:8080/favorite/all`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const favorites = await res.json();
    console.log("fav utils", favorites);
    return favorites;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (data) => {
  try {
    const res = await fetch("http://localhost:8080/collaborater/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
      credentials: "include",
    });
    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

export const uploadAvatar = async (formData) => {
  try {
    const res = await fetch("http://localhost:8080/avatar-image", {
      method: "POST",
      body: formData,
      mode: "cors",
      credentials: "include",
    });
    const avatarLink = res.json();
    return avatarLink;
  } catch (error) {
    console.error(error);
  }
};

export const getHomeFeed = async () => {
  try {
    const res = await fetch("http://localhost:8080/homeFeed", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
