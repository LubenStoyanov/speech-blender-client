import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { username } = useParams();
  return (
    <div className="navbar">
      <ul className="nav-links">
        <Link to={username ? `/profile/${username}` : "/"}>
          <img src="/logo-light.png"></img>
        </Link>
      </ul>
    </div>
  );
}
