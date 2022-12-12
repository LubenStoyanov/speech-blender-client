import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Form, useLoaderData } from "react-router-dom";
import SearchUser from "../components/SearchUser";
import { addUser, findUser } from "../utils";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "all";
  console.log(query);

  const users = await findUser(query);

  return { users };
};

export const action = async ({ request, params }) => {
  const { podcastId } = params;
  const formData = await request.formData();
  const username = formData.get("username");
  try {
    console.log(username, podcastId);

    await addUser({ username: username, podcastId: podcastId });
    return redirect(`/profile/${username}/users/${podcastId}`);
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
        <>
          <div className="flex justify-center">
            <Form
              className="flex justify-center items-center"
              key={u._id}
              method="post"
            >
              <div>
                <h2>{u.username}</h2>
              </div>
              <input
                type="text"
                name="username"
                value={`${u.username}`}
                readOnly
                hidden
              />

              <button
                className="btn border-2 rounded-md border-slate-100 m-3 p-2"
                type="submit"
              >
                <IconContext.Provider value={{ color: "white", size: "30px" }}>
                  <AiOutlineUsergroupAdd />
                </IconContext.Provider>
              </button>
            </Form>
          </div>
          <div className="divider text-white"></div>
        </>
      ))}
    </div>
  );
}
