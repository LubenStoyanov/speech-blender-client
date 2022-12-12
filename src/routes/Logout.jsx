import React from "react";
import { Form, redirect } from "react-router-dom";
import { logout } from "../auth";

export const action = async () => {
  try {
    await logout();
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
