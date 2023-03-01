import "./Project.css";
import React from "react";
import { useLocation } from "react-router-dom";
import {
  BsInfoCircle,
  BsChatLeftText,
  BsPeople,
  BsPlusLg,
} from "react-icons/bs";

export default function Project() {
  let location = useLocation();
  console.log(location);
  return (
    <div className="project">
      <div className="section_title">
        <h1>Create Project</h1>
      </div>
      <div className="section_content">
        <div className="section_header">
          <div className="top_bar">
            <div className="left">
              <h2>{location.state.projectdata.project_name}</h2>
              <BsInfoCircle className="proj_fun_icons" />
            </div>
            <button className="create_task btn">
              <BsPlusLg className="add_btn" />
              Create Task
            </button>
          </div>
          <div className="bottom_bar">
            <div className="desc_contain">
              {/* limit task desc to 521 characters */}
              <p className="task_desc">
                {location.state.projectdata.discription.substring(0, 236)}
                {location.state.projectdata.discription.length > 521 && "..."}
              </p>
            </div>
            <div className="bottom_right">
              <BsChatLeftText className="proj_fun_icons" />
              <BsPeople className="proj_fun_icons" />
            </div>
          </div>
        </div>
        <div className="kanban_contain">kanban</div>
      </div>
    </div>
  );
}
