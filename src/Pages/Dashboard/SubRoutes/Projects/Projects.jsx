import React from "react";
import { useNavigate } from "react-router";
import { BsSearch, BsFilter, BsPlusLg } from "react-icons/bs";
import "./Projects.css";
import Select from "react-select";

export default function Projects() {
  const navigate = useNavigate();
  const sortingOptions = [
    { value: "created", label: "Start Time" },
    { value: "deadline", label: "Deadline" },
    { value: "tasks", label: "Tasks" },
    { value: "progress", label: "Progress" },
  ];
  return (
    <div className="projects">
      <div className="section_title">
        <h1>Dashboard</h1>

        <button
          className="create_project btn"
          onClick={() => {
            navigate("/dashboard/addProject");
          }}
        >
          <BsPlusLg className="add_btn" />
          New Project
        </button>
      </div>
      <div className="header_bar">
        <div className="search_contain">
          <BsSearch className="search_icon" />
          <input
            type="text"
            className="proj_search_tb"
            placeholder="Search Project"
          />
        </div>
        <div className="sortby">
          <BsFilter className="filter_icon" />
          <div style={{ width: "100%" }}>
            <Select
              options={sortingOptions}
              isSearchable={false}
              placeholder="Sort By"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
