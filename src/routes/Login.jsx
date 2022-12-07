import React from "react";
import { Form, json, redirect, useActionData } from "react-router-dom";
import { login } from "../utils";

export const action = async ({ request }) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    const res = await login(formData);

    if (!res.ok)
      return json({
        error: res.status === 401 ? "Wrong Password" : "Email doesn't exist",
      });

    return redirect(`/profile/${formData.username}`);
  } catch (error) {
    console.error(error);
  }
};

export default function Login() {
  const error = useActionData();
  console.log(error);
  return (
    <div className="App">
      <Form method="post" action="/login">
        <fieldset className="flex flex-col justify-center m-5 text-neutral">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            id="username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            required
          />
          <button type="submit" className="btn  rounded-md  mt-5 p-2">
            Login
          </button>
        </fieldset>
      </Form>
    </div>
  );
}
