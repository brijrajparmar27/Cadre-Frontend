import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import useProject from "../../../../Hooks/useProject";
import useUserCollection from "../../../../Hooks/useUserCollection";
import "./CreateProject.css";
export default function CreateProject() {
  const [selectMebers, setSelectMebers] = useState([]);
  const { getAlluser, userdata } = useUserCollection();
  const { AddProject } = useProject();
  const {userData}=useSelector((state)=>state.logindataslice);
  let options = userdata.map(function (data) {
    return { value: data, label: data.name };
  });
  useEffect(() => {
    getAlluser();
  }, []);
  const populateMembers = (members) => {
    let memberArr = [];
    members.forEach((member) => {
      memberArr.push(member.value);
      setSelectMebers(memberArr);
    });
    memberArr = [];
  };
  const handelsubmit = (e) => {
    e.preventDefault();
    delete userData.jwt;
    const projectdata = {
      project_name: e.target.projectname.value.trim(),
      discription: e.target.projectDescripation.value.trim(),
      assigned_date: e.target.assigenedate.value.trim(),
      deadline: e.target.DeadLine.value.trim(),
      member: selectMebers,
      lead:userData
    };
    console.log(projectdata);
    if (
      projectdata.project_name.length > 0 &&
      projectdata.discription.length > 0 &&
      projectdata.assigned_date.length > 0 &&
      projectdata.deadline.length > 0 &&
      projectdata.member.length > 0 &&
      userData.length>0
    ) {
      AddProject(projectdata);
    } else {
      console.log("cannot be empty");
    }
  };
  return (
    <div>
      <form onSubmit={handelsubmit}>
        <div className="">
          Name
          <input type="text" className="textbox" name="projectname" />
          Descripation
          <input type="text" className="textbox" name="projectDescripation" />
          Assigend Date
          <input type="Date" className="textbox" name="assigenedate" />
          DeadLine
          <input type="Date" className="textbox" name="DeadLine" />
          <Select options={options} isMulti onChange={populateMembers} />
          <button type="submit">addproject</button>
        </div>
      </form>
    </div>
  );
}
