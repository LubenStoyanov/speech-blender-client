export const setToken = (newValue) => {
  try {
    window.localStorage.setItem("token", JSON.stringify(newValue));
  } catch (error) {
    console.error(error);
  }
};

export const checkToken = async () => {
  try {
    const token = await JSON.parse(window.localStorage.getItem("token"));
    const res = await fetch("http://localhost:8080/profile/asd", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (data) => {
  const res = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
  const token = await res.json();
  setToken(token);
};

export const logout = async (data) => {
  await fetch("http://localhost:8080/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
  setToken(null);
};

export const register = async (data) => {
  return await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
};
