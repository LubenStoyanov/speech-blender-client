import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';


export default function Navbar() {

    return (
      <div className="navbar" >
        <ul className="nav-links">      
                <Link to="/"><img src="/logo-light.png"></img></Link>  
        </ul>
      </div>
    )
  }