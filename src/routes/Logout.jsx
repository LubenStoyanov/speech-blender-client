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
    <div className="flex justify-end">
      <Form className="btn flex btn-primary" method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
