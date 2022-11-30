import React from "react";
import { Form, redirect, useNavigate, useParams } from "react-router-dom";
import { logout } from "../utils";

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
        <button className="btn flex btn-primary" type="submit">
          Logout
        </button>
      </Form>
    </div>
  );
}
