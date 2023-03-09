import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import avatar from "../../../../../assets/images/avatar.svg";
import "./Details.css";
import moment from "moment/moment";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FcHighPriority } from "react-icons/fc";

function Details() {
  const [active, setActive] = useState(0);
  const tabs = [
    { title: "Pending", index: 0 },
    { title: "Running", index: 1 },
    { title: "Completed", index: 2 },
    { title: "Closed", index: 3 },
  ];
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
              {projectData?.member?.map((each) => {
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
                {tabs.map((each) => {
                  return (
                    <p
                      className={
                        each.index == active ? "tab active" : "tab inactive"
                      }
                      key={each.index}
                      onClick={() => {
                        console.log(each.index);
                        setActive(each.index);
                      }}
                    >
                      {each.title}
                    </p>
                  );
                })}
              </div>
              <div className="switcher_body">
                {/* <div className="overflow"></div>
                <div className="overflow"></div>
                <div className="overflow"></div> */}
                {projectData.task.map((each) => {
                  if (
                    each.status.toLowerCase() ==
                    tabs[active].title.toLowerCase()
                  ) {
                    console.log(each);
                    return (
                      <div className={"taskcard"}>
                        <h3 className="title">{each.title}</h3>
                        <p className="description">{each?.description}</p>
                        <div className="assigned">
                          <div className="avatars">
                            {each?.assigned?.map((each, index) => {
                              return (
                                index < 4 && (
                                  <a
                                    href="#"
                                    className="avatars__item"
                                    key={each._id}
                                  >
                                    <img
                                      className="avatar"
                                      src={each.img || avatar}
                                      alt=""
                                    />
                                  </a>
                                )
                              );
                            })}

                            {each?.assigned?.length > 4 && (
                              <a href="#" className="avatars__item">
                                <p>+{each.assigned.length - 4}</p>
                              </a>
                            )}
                          </div>

                          {each.priority && (
                            <div className="task_priority">
                              <FcHighPriority />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="progress">
            <div className="project_progress">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textSize: "25px",
                  pathColor: "#26329f",
                  textColor: "#26329f",
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
