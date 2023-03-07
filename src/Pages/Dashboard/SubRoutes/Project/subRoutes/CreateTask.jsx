import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import useProject from "../../../../../Hooks/useProject";

function CreateTask() {
  const location = useLocation();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState();
  const { addTask } = useProject();
  console.log(location);
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
    };
    console.log(obj.title);
    if (
      obj.title.length > 0 &&
      obj.description.length > 0 &&
      obj.assigned.length > 0
    ) {
      
      addTask(obj).then((res) => {
        console.log(res, "in create Task");
        // console.log({state:{projectdata: {...}}});
        navigate("/dashboard/project", {
          state: { projectdata: { ...location.state } },
        });
      });
    } else {
      setError("field cannot be empty");
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
    <div>
      <form onSubmit={inputSubmit}>
        description <input name="description" type="text" />
        Title <input name="title" type="text" />
        <Select options={options} isMulti onChange={inputmember}></Select>
        <p className="error_msg">{error}</p>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default CreateTask;
