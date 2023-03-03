import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import useProject from "../../../../../Hooks/useProject";

function CreateTask() {
  const location = useLocation();
  const navigate = useNavigate();
  const [membes, setMembers] = useState([]);
  const [error, setError] = useState();
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
    console.log(obj.title)
    if (
      obj.title.length > 0 &&
      obj.descripation.length > 0 &&
      obj.assigned.length > 0
    ) {
      addTask(data).then((res) => {
        console.log(res);
        navigate("/dashboard/project", { state: { projectdata: res.data } });
      }); 
    }
    else{
        setError('field cannot be empty')
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
        descripation <input name="descripation" type="text" />
        Title <input name="title" type="text" />
        <Select options={options} isMulti onChange={inputmember}></Select>
        <p className="error_msg">{error}</p>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default CreateTask;
