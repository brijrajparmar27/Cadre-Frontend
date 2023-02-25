import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import avatar from "../../../../../../assets/images/avatar.svg";
import "./ProjectCard.css";

export default function ProjectCard({ data }) {
  const percentage = 66;

  return (
    <div className="card">
      <h3 className="project_title">{data.project_name}</h3>
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ex
        suscipit voluptatum architecto assumenda corrupti voluptate
        necessitatibus, voluptatibus hic a porro provident omnis possimus? Atque
        dicta omnis earum deserunt placeat.
      </p>
      <div className="project_members">
        <div className="avatars">
          {data?.member?.map((each, index) => {
            return (
              index < 4 && (
                <a href="#" className="avatars__item" key={each.id}>
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
