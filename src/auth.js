const API_URL = import.meta.env.VITE_API_URL;
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
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
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
