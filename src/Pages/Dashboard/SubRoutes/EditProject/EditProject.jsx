import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import useProject from "../../../../Hooks/useProject";
import useUserCollection from "../../../../Hooks/useUserCollection";
import { toast } from "react-toastify";
import "./EditProject.css";

export default function EditProject() {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.logindataslice);
  const location = useLocation();

  const { getAlluser, userdata } = useUserCollection();
  const { getAllSatck, stackdata, updateProject } = useProject();

  const [userOptions, setUserOptions] = useState([]);
  const [stackOptions, setStackOptions] = useState([]);

  const [projectData, setProjectData] = useState({
    project_name: location.state.project_name,
    description: location.state.description,
    assigned_date: location.state.assigned_date,
    deadline: location.state.deadline,
    member: location.state.member,
    progress: location.state.progress,
    lead: location.state.lead,
    stack: location.state.stack,
  });

  const mutateProjectData = (key, value) => {
    setProjectData((prev) => {
      let temp = prev;
      temp[key] = value;
      return temp;
    });
  };

  console.log("location", location);

  useEffect(() => {
    getAlluser();
    getAllSatck();
  }, []);

  useEffect(() => {
    console.log(userdata, stackdata);
    console.log(location.state.member);
    console.log(location.state.stack);
    setStackOptions(
      stackdata.map((each) => {
        return { value: each, label: each.title };
      })
    );
    setUserOptions(
      userdata.map((each) => {
        return { value: each, label: each.name };
      })
    );
  }, [userdata, stackdata]);

  const handelsubmit = (e) => {
    e.preventDefault();
    const currentUser = { ...userData };
    delete currentUser?.jwt;
    console.log(projectData);
    if (projectData.member.length > 0 || projectData.stack.length > 0) {
      updateProject(projectData, location.state._id);
      toast.success("project update successfully");
      navigate("/dashboard");
      // e.target.reset();
    } else {
      console.log("cannot be empty");
    }
  };

  return (
    <div className="create_project_section">
      <div className="section_title">
        <BsArrowLeft
          className="back_icon"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1>Update Project</h1>
      </div>

      <form onSubmit={handelsubmit} className="create_content">
        <p className="input_label">Project Name</p>
        <input
          type="text"
          className="textbox"
          name="projectname"
          required
          defaultValue={projectData.project_name}
          onChange={(e) => {
            mutateProjectData("project_name", e.target.value.trim());
          }}
        />
        <p className="input_label">Project Description</p>
        <input
          type="text"
          className="textbox"
          name="projectDescripation"
          required
          defaultValue={projectData.description}
          onChange={(e) => {
            mutateProjectData("description", e.target.value.trim());
          }}
        />
        <p className="input_label">Assigned Date</p>
        <input
          type="Date"
          className="textbox"
          name="assigenedate"
          required
          defaultValue={moment(projectData.assigned_date).format("YYYY-MM-DD")}
          onChange={(e) => {
            mutateProjectData("assigned_date", e.target.value);
          }}
        />
        <p className="input_label">Project Deadline</p>
        <input
          type="Date"
          className="textbox"
          name="DeadLine"
          defaultValue={moment(projectData.deadline).format("YYYY-MM-DD")}
          onChange={(e) => {
            mutateProjectData("deadline", e.target.value);
          }}
        />
        <p className="input_label">Select Project Members</p>
        <Select
          options={userOptions}
          isMulti
          required
          defaultValue={projectData.member.map((each) => {
            return { value: each, label: each.name };
          })}
          onChange={(e) => {
            mutateProjectData(
              "member",
              e.map((each) => each.value)
            );
          }}
        />
        <p className="input_label">Project Technologies</p>
        <Select
          options={stackOptions}
          isMulti
          required
          defaultValue={projectData.stack.map((each) => {
            return { value: each, label: each.title };
          })}
          onChange={(e) => {
            mutateProjectData(
              "stack",
              e.map((each) => each.value)
            );
          }}
        />
        <button type="submit" className="create_project">
          Update Project
        </button>
      </form>
    </div>
  );
}
