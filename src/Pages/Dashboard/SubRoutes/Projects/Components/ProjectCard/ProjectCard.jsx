import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import avatar from "../../../../../../assets/images/avatar.svg";
import "./ProjectCard.css";

export default function ProjectCard({ data }) {
  const percentage = 66;
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_SERVER);

  return (
    <div
      className="card"
      onClick={() => {
        console.log(data, " on project card");
        navigate("/dashboard/project", { state: { projectdata: data } });
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
              src={`${import.meta.env.VITE_STACK}${each.url}`}
              alt={each.title}
            />
          );
        })}
      </p>
      <div className="project_progress">
        <CircularProgressbar
          value={data?.progress}
          text={`${Math.round(data?.progress)}%`}
          styles={buildStyles({
            textSize: "25px",
            pathColor: "#26329f",
            textColor: "#26329f",
          })}
        />
      </div>
      <p className="project_description">
        {data?.description?.substring(0, 236)}
        {data?.description?.length > 236 && "..."}
      </p>
      <div className="project_members">
        <div className="avatars">
          {data?.member?.map((each, index) => {
            console.log(each);
            return (
              index < 4 && (
                <div className="avatars__item_contain" key={each._id}>
                  <p className="whoami">{each.name}</p>
                  <a href="#" className="avatars__item">
                    <img
                      className="avatar"
                      src={
                        each.img
                          ? `${import.meta.env.VITE_SERVER}${each.img}`
                          : avatar
                      }
                      alt=""
                    />
                  </a>
                </div>
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
