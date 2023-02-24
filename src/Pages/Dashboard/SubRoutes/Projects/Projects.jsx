import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { BsSearch, BsFilter, BsPlusLg } from "react-icons/bs";
import "./Projects.css";
import Select from "react-select";
import "react-circular-progressbar/dist/styles.css";
import useProject from "../../../../Hooks/useProject";
import { useSelector } from "react-redux";
import ProjectCard from "./Components/ProjectCard/ProjectCard";

export default function Projects() {
  const navigate = useNavigate();

  const sortingOptions = [
    { value: "created", label: "Start Time" },
    { value: "deadline", label: "Deadline" },
    { value: "tasks", label: "Tasks" },
    { value: "progress", label: "Progress" },
  ];

  const { userData } = useSelector((state) => state.logindataslice);
  const { projectData } = useSelector((state) => state.projectdatareducer);
  const { getAllProject } = useProject();

  console.log("projectdata", projectData);

  useEffect(() => {
    getAllProject(userData?._id);
  }, []);

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
        {projectData?.map((data) => {
          return <ProjectCard data={data} key={data._id} />;
        })}
      </div>
    </div>
  );
}
