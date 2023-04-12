import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BsSearch, BsFilter, BsPlusLg } from "react-icons/bs";
import "./Projects.css";
import Select from "react-select";
import "react-circular-progressbar/dist/styles.css";
import useProject from "../../../../Hooks/useProject";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./Components/ProjectCard/ProjectCard";
import API from "../../../axios/axios";
import { setProjectData } from "../../../redux/projectDataSlice";
import astroEmpty from "../../../../assets/Lottie/astroEmpty.json";
import Empty from "../../../../UniversalComponents/Empty/Empty";
import timesheetLoading from "../../../../assets/Lottie/timesheetLoading.json";
import Loading from "../../../../UniversalComponents/Loading/Loading";

export default function Projects() {
  const navigate = useNavigate();

  const sortingOptions = [
    { value: "created", label: "Start Time" },
    { value: "deadline", label: "Deadline" },
    { value: "tasks", label: "Tasks" },
    { value: "completed", label: "Completed" },
    { value: "progress", label: "Progress" },
    { value: "project_name", label: "project Name" },
  ];
  const [loading, setLoading] = useState(false);

  const { setOrder, setColoumname, order, coloumname, searchProject } =
    useProject();

  const selectinput = (e) => {
    setColoumname(e.value);
    setOrder("asc");
  };

  const { userData } = useSelector((state) => state.logindataslice);
  const { projectData } = useSelector((state) => state.projectdatareducer);

  const { getAllProject } = useProject();
  const dispatch = useDispatch();
  console.log("user", userData);
  useEffect(() => {
    getAllProject(userData?._id, setLoading);
  }, []);

  useEffect(() => {
    API.get(
      `/get-projectbyuserrole/${userData?._id}?sort={"column":"${coloumname}","order":"${order}"}`
    )
      .then((res) => {
        dispatch(setProjectData(res.data.res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [order, coloumname]);
  const searchinput = (e) => {
    searchProject(e.target.value);
  };

  return (
    <div className="projects">
      <div className="section_title">
        <h1>Dashboard</h1>

        {userData && userData.role_name === "Sr Devloper" || userData.role_name === "Admin" ? (
          <button
            className="create_project btn"
            onClick={() => {
              navigate("/dashboard/addProject");
            }}
          >
            <BsPlusLg className="add_btn" />
            New Project
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="header_bar">
        <div className="search_contain">
          <BsSearch className="search_icon" />
          <input
            type="text"
            className="proj_search_tb"
            placeholder="Search Project"
            onChange={searchinput}
          />
        </div>
        <div className="sortby">
          <BsFilter
            className={order == "Asc" ? "filter_icon rotate" : "filter_icon"}
            onClick={() =>
              setOrder((prevState) => (prevState === "Asc" ? "Desc" : "Asc"))
            }
          />
          <div style={{ width: "100%" }}>
            <Select
              options={sortingOptions}
              isSearchable={false}
              placeholder="Sort By"
              onChange={selectinput}
            />
          </div>
        </div>
      </div>
      <div className="projects_section" id="style-1">
        <Empty
          isLoading={loading}
          isEmpty={projectData.length == 0}
          display={astroEmpty}
        />
        {/* <Loading isLoading={loading} display={timesheetLoading} /> */}
        {projectData?.map((data) => {
          return <ProjectCard data={data} key={data._id} />;
        })}
      </div>
    </div>
  );
}
