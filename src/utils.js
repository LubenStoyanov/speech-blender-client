const API_URL = import.meta.env.VITE_API_URL;

export const createPodcast = async (data) => {
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
    return favorites;
  } catch (error) {
    console.error(error);
  }
};

export const findUser = async (query) => {
  try {
    const res = await fetch(`${API_URL}/users/${query}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
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

export const getAvatarImage = async () => {
  try {
    const res = await fetch(`${API_URL}/avatar-image`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const url = await res.json();
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
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
