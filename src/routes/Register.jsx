import { Form, json, redirect, useActionData } from "react-router-dom";
import { register } from "../utils";

export const action = async ({ request }) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    const response = await register(formData);

    if (!response.ok) {
      return json({ error: "Email already exists." });
    }
    return redirect("/login");
  } catch (error) {
    console.error(error);
  }
};

function Register() {
  const actionData = useActionData();

  return (
    <div className="Root">
      <Form method="post" action="/register">
        <fieldset
          className="flex flex-col justify-center m-5"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            id="username"
            required
            defaultValue="asd"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            id="email"
            required
            defaultValue="asd@asd.com"
          />
          {actionData?.error ? (
            <p style={{ color: "red" }}>{actionData.error}</p>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            required
            defaultValue="asd"
            minLength={8}
            onInvalid={() => "Please enter minium 8 chracters"}
          />
          <button type="submit" className="btn border-4 rounded-md border-slate-100 mt-5 p-2">
            Sign Up
          </button>
        </fieldset>
      </Form>
      </div>
  );
}

export default Register;
