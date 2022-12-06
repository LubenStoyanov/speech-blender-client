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
      `${process.env.API_URL}/users/${query}`,
      // `http://localhost:8080/users/${query}`,
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
      <SearchUser />
      {users.map((u) => (
        <Form key={u._id} method="post">
          <h2>{u.username}</h2>
          <input
            type="text"
            name="username"
            value={`${u.username}`}
            readOnly
            hidden
          />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </Form>
      ))}
    </div>
  );
}
