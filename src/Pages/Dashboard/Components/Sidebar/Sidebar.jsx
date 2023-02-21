import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import logo from "../../../../assets/images/logo.png";
import './Sidebar.css'
export default function Sidebar() {
  const { Logout } = useAuth();
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <img src={logo} alt="logo" className="sidebar_logo" />
      </div>
      <h1 onClick={Logout}>Dashboard</h1>
      <NavLink to="/dashboard">projects</NavLink>
      <NavLink to="/dashboard/settings">settings</NavLink>
    </div>
  );
}
