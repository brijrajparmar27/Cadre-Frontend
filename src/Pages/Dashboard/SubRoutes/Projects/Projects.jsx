import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { BsSearch, BsFilter, BsPlusLg } from "react-icons/bs";
import "./Projects.css";
import Select from "react-select";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useProject from "../../../../Hooks/useProject";
import { useSelector } from "react-redux";

export default function Projects() {
  const navigate = useNavigate();
  const sortingOptions = [
    { value: "created", label: "Start Time" },
    { value: "deadline", label: "Deadline" },
    { value: "tasks", label: "Tasks" },
    { value: "progress", label: "Progress" },
  ];
  const percentage = 66;
  const { userData } = useSelector((state) => state.logindataslice);
  const { projectData } = useSelector((state) => state.projectdatareducer);
  const { getAllProject } = useProject();
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
        {projectData?.map((data) => (
          <div className="card" key={data._id}>
            <h3 className="project_title">{data.project_name}</h3>
            <p className="tech_stack">
              <img
                className="tech_icon"
                src="http://localhost:4040/public/stacks/react.svg"
                alt=""
              />
              <img
                className="tech_icon"
                src="http://localhost:4040/public/stacks/mongo.svg"
                alt=""
              />
              <img
                className="tech_icon"
                src="http://localhost:4040/public/stacks/nodejs.svg"
                alt=""
              />
            </p>
            <div className="project_progress">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({ textSize: "25px" })}
              />
            </div>
            <p className="project_description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
              ex suscipit voluptatum architecto assumenda corrupti voluptate
              necessitatibus, voluptatibus hic a porro provident omnis possimus?
              Atque dicta omnis earum deserunt placeat.
            </p>
            <div className="project_members">
              <div className="avatars">
                <a href="#" className="avatars__item">
                  <img
                    className="avatar"
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt=""
                  />
                </a>
                <a href="#" className="avatars__item">
                  <img
                    className="avatar"
                    src="https://randomuser.me/api/portraits/men/25.jpg"
                    alt=""
                  />
                </a>
                <a href="#" className="avatars__item">
                  <img
                    className="avatar"
                    src="https://randomuser.me/api/portraits/women/25.jpg"
                    alt=""
                  />
                </a>
                <a href="#" className="avatars__item">
                  <img
                    className="avatar"
                    src="https://randomuser.me/api/portraits/men/55.jpg"
                    alt=""
                  />
                </a>
                <a href="#" className="avatars__item">
                  <p>+4</p>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
