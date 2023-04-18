import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import logo from "../../../../assets/images/logo.png";
import {
  BsFolder2Open,
  BsClipboardData,
  BsGear,
  BsChatLeftText,
  BsChevronUp,
} from "react-icons/bs";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { motion } from "framer-motion";
import avatar from "../../../../assets/images/avatar.svg";

const arrowVariant = {
  up: {
    rotate: 0,
  },
  down: {
    rotate: 180,
  },
};

export default function Sidebar() {
  const { Logout } = useAuth();
  const { userData } = useSelector((state) => state.logindataslice);
  const { projectData } = useSelector((state) => state.projectdatareducer);
  const [expandProjects, setExpandProjects] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <img src={logo} alt="logo" className="sidebar_logo" />

        <div className="sidebar_content">
          <NavLink to="/dashboard" className="nav_contain droppable" end>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <BsFolder2Open className="link_icon" />
              <p className="nav_title">Projects</p>
            </div>
            <motion.div
              className="drop_arrow"
              onClick={(e) => {
                // e.stopPropagation();
                setExpandProjects((prev) => !prev);
              }}
              variants={arrowVariant}
              animate={expandProjects ? "up" : "down"}
            >
              <BsChevronUp />
            </motion.div>
          </NavLink>
          {expandProjects && (
            <div className="project_list">
              {projectData?.map((each, index) => {
                return (
                  <NavLink
                    className="project_card"
                    to="/dashboard/project"
                    state={{ projectdata: each }}
                    key={index}
                  >
                    <div
                      className="dot"
                      style={{
                        backgroundColor: each.hex,
                      }}
                    ></div>
                    <p>
                      {each?.project_name.substring(0, 20)}
                      {each?.project_name.length > 20 && "..."}
                    </p>
                  </NavLink>
                );
              })}
            </div>
          )}
          <NavLink to="/dashboard/time-sheet" className="nav_contain">
            <BsClipboardData className="link_icon" />
            <p className="nav_title">Time Sheet</p>
          </NavLink>
          <NavLink to="/dashboard/chats" className="nav_contain">
            <BsChatLeftText className="proj_fun_icons" />
            <p className="nav_title">Chats</p>
          </NavLink>
          {userData && userData.role_name === "Admin" ? (
            <NavLink to="/dashboard/all-users" className="nav_contain">
              <AiOutlineUser className="link_icon" />
              <p className="nav_title">Users</p>
            </NavLink>
          ) : (
            ""
          )}
          <NavLink to="/dashboard/settings" className="nav_contain">
            <BsGear className="link_icon" />
            <p className="nav_title">Settings</p>
          </NavLink>
        </div>
      </div>
      <div className="sidebar_footer">
        <div className="card_stack">
          <div className="logout_card" onClick={Logout}>
            <p>Logout</p>
          </div>
          <div className="user_card">
            <div className="user_dp">
              <img
                className="sidebar_dp"
                src={
                  userData.img
                    ? `${import.meta.env.VITE_SERVER}${userData.img}`
                    : avatar
                }
              />
            </div>
            <div className="user_info">
              <div className="info">
                <div className="center">
                  <p className="user_name">{userData?.name}</p>
                  <p className="user_designation">{userData?.role_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
