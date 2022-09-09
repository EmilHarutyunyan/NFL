import React from "react";
import { Link } from "react-router-dom";
import { links } from "./dataLinks";
// Styles
import { Nav } from "./Header.styles";

function Navbar() {
  return (
    <Nav>
      <ul>
        {links.map((item) => {
          const { id, url, text } = item;
          return (
            <li key={id}>
              <Link to={url}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </Nav>
  );
}

export default Navbar;
