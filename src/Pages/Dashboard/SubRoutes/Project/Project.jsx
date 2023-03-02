import "./Project.css";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import {
  BsInfoCircle,
  BsChatLeftText,
  BsPeople,
  BsPlusLg,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import useProject from "../../../../Hooks/useProject";

export default function Project() {
  const [showClosed, setShowClosed] = useState(false);
  const [projectData,setProjectData] = useState(null);
  let location = useLocation();
  const hideClosed = {
    gridTemplateRows: `6fr 0.3fr`,
    gridTemplateColumns: `1fr 1fr 1fr`,
    gridTemplateAreas: `
        pending running completed
        footer footer footer`,
  };
  console.log(location);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.logindataslice);
  const { getprojectbyProjectId } = useProject();
  
  useEffect(() => {
    console.log("-----get projectData--------");
    getprojectbyProjectId(location?.state?.projectdata._id).then(res=>{
      console.log(res.data);
      setProjectData(res.data);
    });
  }, []);
  useEffect(()=>{
    console.log("project data",projectData);
  },[projectData])
  return (<>
    { projectData && <div className="project">
      <div className="section_title">
        <h1>Create Project</h1>
      </div>
      <div className="section_content">
        <div className="section_header">
          <div className="top_bar">
            <div className="left">
              <h2>{projectData?.project_name}</h2>
              <BsInfoCircle className="proj_fun_icons" onClick={(e) => {
                      navigate("details");
                    }}/>
            </div>
            <button
              className="create_task btn"
              onClick={() => {
                navigate("createTask",{state:projectData});
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
                  <span
                    className="view-more"
                  >
                    "..."
                  </span>
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
          <div className="kanban" style={showClosed ? {} : hideClosed}>
            <div className="pending">pending</div>
            <div className="running">running</div>
            <div className="completed">completed</div>
            <div
              className="kanban_footer"
              onClick={() => {
                setShowClosed((prev) => !prev);
              }}
            >
              <p>{showClosed ? "Hide Closed" : "Show Closed"}</p>
              {!showClosed && (
                <MdOutlineKeyboardArrowUp className="footer_icon" />
              )}
              {showClosed && (
                <MdOutlineKeyboardArrowDown className="footer_icon" />
              )}
            </div>
            {showClosed && <div className="closed">closed</div>}
          </div>
        </div>
      </div>
    </div>}
    </>
  );
}
