import React from "react";
import { Form, redirect } from "react-router-dom";
import { logout, setToken } from "../utils";

export const action = async ({ params }) => {
  try {
    await logout(params);
    return redirect("/login");
  } catch (error) {
    console.error(error);
  }
};

export default function Logout() {
  return (
    <div>
      <Form method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
