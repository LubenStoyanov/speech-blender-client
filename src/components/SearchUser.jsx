import React from "react";
import { Form } from "react-router-dom";

export default function SearchUser() {
  return (
    <div>
      <Form method="get">
        <input type="text" placeholder="Type Username" name="query" />
        <button className="btn border-4 rounded-md border-slate-100 m-3 p-2" type="submit">
          Search
        </button>
      </Form>
    </div>
  );
}
