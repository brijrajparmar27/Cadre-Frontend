import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import useProject from "../../../../../Hooks/useProject";

function CreateTask() {
  const location = useLocation();
  const [membes, setMembers] = useState([]);
  const { addTask } = useProject();
  let options = location?.state?.member.map(function (data) {
    return { value: data, label: data.name };
  });
  const inputSubmit = (e) => {
    e.preventDefault();
    const obj = {
      title: e.target.title.value,
      descripation: e.target.descripation.value,
      assigned: membes,
      lead: location.state.lead,
      project: location.state._id,
    };
    const data = { prev: [...location?.state?.task], new: obj };
    addTask(data);
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
        descripation <input name="descripation" type="text" />
        Title <input name="title" type="text" />
        <Select options={options} isMulti onChange={inputmember}></Select>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default CreateTask;
