import React from "react";
import { useNavigate } from "react-router";
import { BsSearch, BsFilter, BsPlusLg } from "react-icons/bs";
import "./Projects.css";
import Select from "react-select";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Projects() {
  const navigate = useNavigate();
  const sortingOptions = [
    { value: "created", label: "Start Time" },
    { value: "deadline", label: "Deadline" },
    { value: "tasks", label: "Tasks" },
    { value: "progress", label: "Progress" },
  ];
  const percentage = 66;
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
      <div className="projects_section">
        <div className="card">
          <h3 className="project_title">Title</h3>
          <p className="tech_stack">stack</p>
          <div className="project_progress">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
          <p className="project_description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ex
            suscipit voluptatum architecto assumenda corrupti voluptate
            necessitatibus, voluptatibus hic a porro provident omnis possimus?
            Atque dicta omnis earum deserunt placeat.
          </p>
          <div className="project_members"></div>
        </div>
      </div>
    </div>
  );
}
