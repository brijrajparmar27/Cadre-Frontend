import React from "react";
import { Navigate, useNavigate } from "react-router";
import ToggleButton from "react-toggle-button";
import "./Projects.css";

export default function Projects() {
  const navigate=useNavigate();
  return (
    <div className="projects">
      <h1>Dashboard</h1>
      <div className="header_bar">
        <input type="text" />
        <select name="sort" id="sort">
          <option value="created">Start Time</option>
          <option value="deadline">Deadline</option>
          <option value="tasks">Tasks</option>
          <option value="progress">Progress</option>
        </select>
        <button  onClick={()=>{navigate('/dashboard/addProject')}}>create project</button>
      </div>
    </div>
  );
}
