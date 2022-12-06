import React from "react";
import { Form, useFetcher, useLoaderData } from "react-router-dom";
import SearchUser from "../components/SearchUser";
import { addUser } from "../utils";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "all";
  console.log(query);
  try {
    const res = await fetch(
      // "https://speech-blender-backend-production.up.railway.app/users",
      `http://localhost:8080/users/${query}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const users = await res.json();
    return { users };
  } catch (error) {
    console.error(error);
  }
};

export const action = async ({ request, params }) => {
  const { podcastId } = params;
  const formData = await request.formData();
  const username = formData.get("username");
  try {
    console.log(username, podcastId);

    await addUser({ username: username, podcastId: podcastId });
  } catch (error) {
    console.error(error);
  }
};

export default function Users() {
  const { users } = useLoaderData();

  return (
    <div>
      <div className="flex justify-center">
        <SearchUser />
      </div>
      {users.map((u) => (
        <div className="flex justify-center">
          <Form key={u._id} method="post">
          <h2>{u.username}</h2>
          <input
            type="text"
            name="username"
            value={`${u.username}`}
            readOnly
            hidden
          />
          
          <button className="btn border-2 rounded-md border-slate-100 m-3 p-2" type="submit">
            Add
          </button>
        </Form>
        </div>
      ))}
    </div>
  );
}
