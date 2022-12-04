import React from "react";
import { Form } from "react-router-dom";

export default function SearchUser() {
  return (
    <div>
      <Form method="get">
        <input type="text" name="query" />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </Form>
    </div>
  );
}
