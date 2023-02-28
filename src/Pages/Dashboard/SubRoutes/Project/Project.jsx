import "./Project.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { BsInfoCircle, BsChatLeftText, BsPeople } from "react-icons/bs";

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
              <h2>Project Title</h2>
              <BsInfoCircle className="proj_fun_icons" />
            </div>
            <button className="create_task btn">Create Task</button>
          </div>
          <div className="bottom_bar">
            <div className="desc_contain">
              {/* limit task desc to 521 characters */}
              <p className="task_desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
                cumque esse inventore placeat voluptatibus eligendi, temporibus
                sint expedita, quidem magni saepe consequatur commodi sequi
                perferendis, aspernatur architecto a harum incidunt. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Earum cumque esse
                inventore placeat voluptatibus eligendi, temporibus sint
                expedita, quidem magni saepe consequatur.
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
