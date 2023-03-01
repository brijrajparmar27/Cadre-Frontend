import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import avatar from "../../../../../../assets/images/avatar.svg";
import "./ProjectCard.css";

export default function ProjectCard({ data }) {
  const percentage = 66;
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        navigate("/dashboard/project", { state: data });
      }}
    >
      <h3 className="project_title">
        {data?.project_name.substring(0, 50)}
        {data?.project_name.length > 50 && "..."}
      </h3>
      <p className="tech_stack">
        {data?.stack?.map((each) => {
          return (
            <img
              key={each._id}
              className="tech_icon"
              src={`http://localhost:4040/public/stacks/${each.url}`}
              alt={each.title}
            />
          );
        })}
      </p>
      <div className="project_progress">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({ textSize: "25px" })}
        />
      </div>
      <p className="project_description">
        {data?.discription.substring(0, 236)}
        {data?.discription.length > 236 && "..."}
      </p>
      <div className="project_members">
        <div className="avatars">
          {data?.member?.map((each, index) => {
            return (
              index < 4 && (
                <a href="#" className="avatars__item" key={each._id}>
                  <img className="avatar" src={each.img || avatar} alt="" />
                </a>
              )
            );
          })}

          {data?.member?.length > 4 && (
            <a href="#" className="avatars__item">
              <p>+{data.member.length - 4}</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
