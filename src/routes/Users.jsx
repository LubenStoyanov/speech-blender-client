import React from "react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const res = await fetch("http://localhost:8080/users");
    const users = await res.json();
    return { users };
  } catch (error) {
    console.error(error);
  }
};

export default function Users() {
  const { users } = useLoaderData();
  return (
    <div>
      {users.map((u) => (
        <h2 key={u.publicId}>{u.username}</h2>
      ))}
    </div>
  );
}
