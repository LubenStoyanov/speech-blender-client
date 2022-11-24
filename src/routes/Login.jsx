import React from "react";
import { Form, redirect } from "react-router-dom";
import { login, setToken } from "../utils";

export const action = async ({ request }) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    await login(formData);
    return redirect(`/profile/${formData.username}`);
  } catch (error) {
    console.error(error);
  }
};

export default function Login() {
  return (
    <div className="App">
      <Form method="post" action="/login">
        <fieldset
          style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
        >
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            id="username"
            required
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            required
          />
          <button type="submit" style={{ backgroundColor: "lightblue" }}>
            Login
          </button>
        </fieldset>
      </Form>
    </div>
  );
}
