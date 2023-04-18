import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../../../../../assets/images/avatar.svg";
import "./Details.css";
import moment from "moment/moment";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FcHighPriority } from "react-icons/fc";
import { BsArrowLeft } from "react-icons/bs";
import nothingToSee from "../../../../../assets/Lottie/nothingToSee.json";
import Empty from "../../../../../UniversalComponents/Empty/Empty";

function Details() {
  const [active, setActive] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    let temp = projectData.task.filter((each) => {
      return each.status.toLowerCase() == tabs[active].title.toLowerCase();
    });
    setFilteredTasks(temp);
  }, [active]);

  return (
    <div className="details">
      <div className="section_title">
        <BsArrowLeft
          className="back_icon"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1>Project Details</h1>
      </div>
      <div className="details_contain" id="style-1">
        <div className="details_content">
          <div className="titlebar_left">
            <h2 className="project_title">{projectData.project_name}</h2>
            <div className="lead">
              <img
                src={
                  projectData?.lead.img
                    ? `${import.meta.env.VITE_SERVER}${projectData?.lead.img}`
                    : avatar
                }
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
                    src={`${import.meta.env.VITE_STACK}${each.url}`}
                    alt={each.title}
                  />
                );
              })}
            </div>
            <p className="subsection_title">Members</p>
            <div className="members" id="style-1">
              {projectData?.member?.map((each) => {
                return (
                  <div key={each._id} className="member_card">
                    <div className="member_img_contain">
                      <img
                        src={
                          each.img
                            ? `${import.meta.env.VITE_SERVER}${each.img}`
                            : avatar
                        }
                        alt=""
                        className="member_avatar"
                      />
                    </div>
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
              <div className="switcher_body" id="style-1">
                {/* <div className="overflow"></div>
                <div className="overflow"></div>
                <div className="overflow"></div> */}
                <Empty
                  isLoading={false}
                  isEmpty={filteredTasks.length == 0}
                  display={nothingToSee}
                />
                {projectData.task.map((each) => {
                  if (
                    each.status.toLowerCase() ==
                    tabs[active].title.toLowerCase()
                  ) {
                    console.log(each);
                    return (
                      <div className={"taskcard"} key={each._id}>
                        <h3 className="title">{each.title}</h3>
                        <p className="description">{each?.description}</p>
                        <div className="assigned">
                          <div className="avatars">
                            {each?.assigned?.map((each, index) => {
                              return (
                                index < 4 && (
                                  <div
                                    className="avatars__item_contain"
                                    key={each._id}
                                  >
                                    <p className="whoami">{each.name}</p>
                                    <a
                                      href="#"
                                      className="avatars__item"
                                      key={each._id}
                                    >
                                      <img
                                        className="avatar"
                                        src={
                                          each.img
                                            ? `${import.meta.env.VITE_SERVER}${
                                                each.img
                                              }`
                                            : avatar
                                        }
                                        alt=""
                                      />
                                    </a>
                                  </div>
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
                value={projectData.progress}
                text={`${Math.round(projectData.progress)}%`}
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
