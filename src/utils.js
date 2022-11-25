export const checkToken = async () => {
  try {
    const res = await fetch("http://localhost:8080/profile/asd", {
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
    await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
      mode: "cors",
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (data) => {
  try {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  }
};

export const register = async (data) => {
  try {
    const res = await fetch("http://localhost:8080/register", {
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
