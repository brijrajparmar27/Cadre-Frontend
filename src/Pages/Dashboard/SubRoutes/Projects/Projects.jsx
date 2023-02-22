import React from "react";
import ToggleButton from "react-toggle-button";
import "./Projects.css";

export default function Projects() {
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
        <button>create project</button>
      </div>
    </div>
  );
}
