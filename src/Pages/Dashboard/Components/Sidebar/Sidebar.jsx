import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import logo from "../../../../assets/images/logo.png";
import { BsFolderFill } from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
import { IoDocument } from "react-icons/io5";
import "./Sidebar.css";
import randomColor from "randomcolor";
export default function Sidebar() {
  const { Logout } = useAuth();
  let projects = [
    "project 1",
    "project 2",
    "project 3",
    "project 4",
    "project 5",
    "project 6",
  ];
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <img src={logo} alt="logo" className="sidebar_logo" onClick={Logout} />

        <div className="sidebar_content">
          <NavLink to="/dashboard" className="nav_contain" end>
            <BsFolderFill className="link_icon" />
            <p>Projects</p>
          </NavLink>
          <div className="project_list">
            {projects.map((each) => {
              return (
                <div className="project_card">
                  <div
                    className="dot"
                    style={{
                      backgroundColor: randomColor({ luminosity: "light" }),
                    }}
                  ></div>
                  <p>{each}</p>
                </div>
              );
            })}
          </div>
          <NavLink to="/dashboard/time-sheet" className="nav_contain">
            <IoDocument className="link_icon" />
            <p>Time Sheet</p>
          </NavLink>
          <NavLink to="/dashboard/settings" className="nav_contain">
            <RiSettings4Fill className="link_icon" />
            <p>Settings</p>
          </NavLink>
        </div>
      </div>
      <div className="sidebar_footer">
        <div className="footer_content">
          <div className="dp_contain">
            <img src="https://avatars.githubusercontent.com/u/73275164" />
          </div>
          <div className="name_contain">Brijrajsinh parmar</div>
          <div className="title_contain">Sr. developer</div>
        </div>
      </div>
    </div>
  );
}
