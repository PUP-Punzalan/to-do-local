import React from "react";

const Navbar = () => {
  return (
    <a href="https://lexmeet.com/" target="_blank" className="navbar--cont">
      <img
        src="https://kampos.lexmeet.com/uploads/-/system/appearance/header_logo/1/lexmeet.png"
        alt="logo"
        className="logo-icon"
      />
      <span className="navbar-title">LexMeet To Do List</span>
    </a>
  );
};

export default Navbar;
