// import * as dotenv from "dotenv";
// dotenv.config();
const API_URL = import.meta.env.VITE_API_URL;
console.log(import.meta.env.VITE_API_URL);

export const checkToken = async () => {
  try {
    const res = await fetch(`${API_URL}/profile/asd`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (data) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(data),
    });
    console.log("login", await res.json());
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  console.log("frontend logout");
  try {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (data) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const uploadClip = async (data) => {
  try {
    const res = await fetch(`${API_URL}/uploadClip`, {
      method: "POST",
      body: data,
      mode: "cors",
      credentials: "include",
    });
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
    const res = await fetch(`${API_URL}/podcast/create-podcast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
      credentials: "include",
    });
    const podcastId = await res.json();
    console.log(podcastId);
    return podcastId;
  } catch (error) {
    console.error(error);
  }
};

export const getPodcastsAll = async () => {
  try {
    const res = await fetch(`${API_URL}/podcast/user`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    const podcasts = await res.json();
    console.log(podcasts);
    return podcasts;
  } catch (error) {
    console.error(error);
  }
};

export const getPodcasts = async (podcastId) => {
  try {
    const podcastRecordings = await fetch(
      `${API_URL}/recording/all/${podcastId}`
    );
    return podcastRecordings;
  } catch (error) {
    console.error(error);
  }
};

export const deletePodcast = async (podcastId) => {
  try {
    await fetch(`${API_URL}/podcast/delete/${podcastId}`, {
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
    await fetch(`${API_URL}/favorite/create-favorite`, {
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
    const res = await fetch(`${API_URL}/favorite/unlike`, {
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
    const res = await fetch(`${API_URL}/favorite/all`, {
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

export const findUser = async (query) => {
  try {
    const res = await fetch(
      `https://speech-blender-backend-production.up.railway.app/users/${query}`,
      // `http://localhost:8080/users/${query}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const users = await res.json();
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/collaborater/add`, {
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
    const res = await fetch(`${API_URL}/avatar-image`, {
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

export const getAvatarImage = async () => {
  try {
    const res = await fetch(`${API_URL}/avatar-image`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const url = await res.json();
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
  }
};

export const getHomeFeed = async () => {
  try {
    const res = await fetch(`${API_URL}/homeFeed`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    console.log(res);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
