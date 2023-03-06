import React from "react";
import { useLocation } from "react-router-dom";
import avatar from "../../../../../assets/images/avatar.svg";
import "./Details.css";
import moment from "moment/moment";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

function Details() {
  let percentage = 30;
  const location = useLocation();
  const projectData = { ...location.state };
  console.log(projectData);

  console.log(moment("12-25-1995", "MM-DD-YYYY"));

  return (
    <div className="details">
      <div className="section_title">
        <h1>Project Details</h1>
      </div>
      <div className="details_contain">
        <div className="details_content">
          <div className="titlebar_left">
            <h2 className="project_title">{projectData.project_name}</h2>
            <div className="lead">
              <img
                src={projectData.img ? projectData.img : avatar}
                alt=""
                className="user_avatar"
              />
              <p className="lead_name">{projectData.lead.name}</p>
            </div>
            <div className="timings">
              <span className="creation pill">
                {`Created at ${moment(projectData.assigned_date).format(
                  "Do MMMM YYYY"
                )}`}
              </span>

              <span className="due pill">
                {`Due | ${moment(projectData.deadline).format("Do MMMM YYYY")}`}
              </span>
            </div>
            <div className="details_text">{projectData.description}</div>
          </div>
          <div className="titlebar_right">
            <div className="stacks">
              {projectData.stack.map((each) => {
                return (
                  <img
                    key={each._id}
                    className="tech_icon"
                    src={`http://localhost:4040/public/stacks/${each.url}`}
                    alt={each.title}
                  />
                );
              })}
            </div>
            <p className="subsection_title">Members</p>
            <div className="members">
              {projectData.member.map((each) => {
                return (
                  <div key={each._id} className="member_card">
                    <img
                      src={
                        projectData.member.img ? projectData.member.img : avatar
                      }
                      alt=""
                      className="member_avatar"
                    />
                    <p>{each.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="tasks_switcher">
            <div className="switcher">
              <div className="switcher_header">
                <p className="tab">Pending</p>
                <p className="tab">Running</p>
                <p className="tab">Completed</p>
                <p className="tab">Closed</p>
              </div>
              <div className="switcher_body"></div>
            </div>
          </div>
          <div className="progress">
            <div className="project_progress">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({ textSize: "25px" })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
