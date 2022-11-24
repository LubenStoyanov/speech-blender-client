import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        columnGap: 15,
      }}
    >
      <Link to={`/register`}>
        <button
          style={{
            backgroundColor: "lightblue",
          }}
        >
          Register
        </button>
      </Link>
      <Link to={`/login`}>
        <button
          style={{
            backgroundColor: "lightblue",
          }}
        >
          Login
        </button>
      </Link>
    </div>
  );
}
