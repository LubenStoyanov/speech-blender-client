import React from "react";
import { createBrowserHistory } from "history";
import {
  BrowserRouter,
  Form,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import { logout } from "../utils";

export const action = async () => {
  try {
    await logout();
    history.pushState(null, null, null);
    window.addEventListener("popstate", function () {
      history.pushState(null, null, null);
    });
    return redirect("/login");
  } catch (error) {
    console.error(error);
  }
};

export default function Logout() {
  return (
    <div className="flex justify-end">
      <Form method="post" action="/logout">
        <button
          className="btn btn-primary brightness-125 rounded-md  m-2 p-2"
          type="submit"
        >
          Logout
        </button>
      </Form>
    </div>
  );
}
