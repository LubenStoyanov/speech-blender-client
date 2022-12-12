const API_URL = import.meta.env.VITE_API_URL;

export const uploadClip = async (data) => {
  try {
    const res = await fetch(`${API_URL}/uploadClip`, {
      method: "POST",
      body: data,
      mode: "cors",
      credentials: "include",
    });
    const linkArray = await res.json();
    return linkArray;
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
