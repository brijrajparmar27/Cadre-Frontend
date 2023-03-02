import "./Project.css";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  BsInfoCircle,
  BsChatLeftText,
  BsPeople,
  BsPlusLg,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import useProject from "../../../../Hooks/useProject";
import Kanban from "./Components/Kanban/Kanban";

export default function Project() {
  const [projectData, setProjectData] = useState(null);
  let location = useLocation();

  console.log(location);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.logindataslice);
  const { getprojectbyProjectId } = useProject();

  useEffect(() => {
    getprojectbyProjectId(location?.state?.projectdata._id).then((res) => {
      setProjectData({ ...res.data });
    });
  }, [location]);
  useEffect(() => {
    // console.log("project data ", projectData);
    projectData && console.log(projectData.task);
  }, [projectData]);
  return (
    <>
      {projectData && (
        <div className="project">
          <div className="section_title">
            <h1>Create Project</h1>
          </div>
          <div className="section_content">
            <div className="section_header">
              <div className="top_bar">
                <div className="left">
                  <h2>{projectData?.project_name}</h2>
                  <BsInfoCircle
                    className="proj_fun_icons"
                    onClick={(e) => {
                      navigate("details");
                    }}
                  />
                </div>
                <button
                  className="create_task btn"
                  onClick={() => {
                    navigate("createTask", { state: projectData });
                  }}
                >
                  <BsPlusLg className="add_btn" />
                  Create Task
                </button>
              </div>
              <div className="bottom_bar">
                <div className="desc_contain">
                  {/* limit task desc to 521 characters */}
                  <p className="task_desc">
                    {projectData?.discription.substring(0, 236)}
                    {projectData?.discription.length > 521 && (
                      <span className="view-more">"..."</span>
                    )}
                  </p>
                </div>
                <div className="bottom_right">
                  <BsChatLeftText className="proj_fun_icons" />
                  <BsPeople className="proj_fun_icons" />
                </div>
              </div>
            </div>
            <div className="kanban_contain">
              <Kanban data={projectData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
