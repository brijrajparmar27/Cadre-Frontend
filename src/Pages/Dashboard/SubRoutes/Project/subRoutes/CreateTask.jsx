import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import ReactSwitch from "react-switch";
import useProject from "../../../../../Hooks/useProject";
import useSendmail from "../../../../../Hooks/useSendmail";
import "./CreateTask.css";
import { toast } from "react-toastify";

function CreateTask() {
  const location = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState();
  const { addTask } = useProject();
  const { sendmail } = useSendmail();
  let options = location?.state?.member.map(function (data) {
    return { value: data, label: data.name };
  });
  const inputSubmit = (e) => {
    e.preventDefault();
    const obj = {
      title: e.target.title.value,
      description: e.target.description.value,
      assigned: members,
      lead: location.state.lead,
      project: location.state._id,
      priority: checked,
      deadline: e.target.DeadLine.value.trim(),
    };
    const maildata = {
      name: members[0].email,
      subject: e.target.title.value,
      message: e.target.description.value,
    };
    if (obj.assigned.length > 0) {
      addTask(obj).then((res) => {
        members.map((user) => {
          sendmail({
            name: user.email,
            subject: `Assign new task in ${location.project_name}`, 
            message: `Title:- ${e.target.title.value} description :- ${e.target.description.value}`
          });
        });
        toast.success('Task add successfully');
          navigate("/dashboard/project", {
          state: { projectdata: { ...location.state } },
        });
      });
    } else {
      toast.error('field cannot be empty')
      //setError("field cannot be empty");
    }
  };
  const inputmember = (e) => {
    let membersarry = [];
    e.forEach((stack) => {
      membersarry.push(stack.value);
      setMembers(membersarry);
    });
  };
  return (
    <div className="create_task_section">
      <div className="section_title">
        <BsArrowLeft
          className="back_icon"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1>Create Task</h1>
      </div>

      <form onSubmit={inputSubmit} className="create_task_form">
        <p className="title field_label">Title</p>
        <input name="title" type="text" className="tb title" required />
        <p className="description field_label">Description</p>
        <input
          name="description"
          type="text"
          className="tb description"
          required
        />
        <p className="priority field_label">Task Priority</p>
        <div className="priority_contain">
          <div className="priority_label_contain">
            <p className={checked ? "priority phigh" : "priority plow"}>
              {checked ? "High" : "Low"}
            </p>
          </div>
          <ReactSwitch
            onChange={() => {
              setChecked((prev) => !prev);
            }}
            checked={checked}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </div>
        <p className="assigned field_label">Assingn Task to</p>
        <Select options={options} isMulti onChange={inputmember}></Select>
        <p className="deadline field_label">Task Deadline</p>
        <input type="Date" className="textbox tb" name="DeadLine" />
        <p className="error_msg">{error}</p>
        <button type="submit" className="submit_task">
          Submit Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
