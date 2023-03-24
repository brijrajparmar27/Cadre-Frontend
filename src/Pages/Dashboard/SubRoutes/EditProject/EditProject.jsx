import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import useProject from "../../../../Hooks/useProject";
import useSendmail from "../../../../Hooks/useSendmail";
import useUserCollection from "../../../../Hooks/useUserCollection";
import "./EditProject.css";
export default function EditProject() {
  const [selectMebers, setSelectMebers] = useState([]);
  const [selectStack, setSelectStck] = useState([]);
  const { getAlluser, userdata } = useUserCollection();
  const { getAllSatck, stackdata,updateProject } = useProject();
  const { userData } = useSelector((state) => state.logindataslice);
  const { sendmail } = useSendmail();
  const location=useLocation();
  console.log('location',location)
  let options = userdata.map(function (data) {
    return { value: data, label: data.name };
  });
  let stckOption = stackdata.map((data) => {
    return { value: data, label: data.title };
  });
  let defaultMembers=location.state.member.map((data)=>{
       return{ value:data,label:data.name}
  });
  let DefaultProjectTech=location.state.stack.map((data)=>{
       return{value:data,label:data.title}
  })
  useEffect(() => {
    getAlluser();
    getAllSatck();
  }, []);
  useEffect(() => {
    console.log(selectMebers);
  }, [selectMebers]);
  const populateMembers = (members) => {
    let memberArr = [];
    members.forEach((member) => {
      memberArr.push(member.value);
      setSelectMebers(memberArr);
    });
    memberArr = [];
  };
  const inputstck = (e) => {
    console.log(e);
    let stackarry = [];
    e.forEach((stack) => {
      stackarry.push(stack.value);
      setSelectStck(stackarry);
    });
  };
  const handelsubmit = (e) => {
    e.preventDefault();
    const currentUser = { ...userData };
    delete currentUser?.jwt;
    const projectdata = {
      project_name: e.target.projectname.value.trim(),
      description: e.target.projectDescripation.value.trim(),
      assigned_date: e.target.assigenedate.value.trim(),
      deadline: e.target.DeadLine.value.trim(),
      member: selectMebers,
      progress: 0,
      lead: currentUser,
      stack: selectStack,
    };
    console.log(projectdata);
    if (
      projectdata.project_name.length > 0 &&
      projectdata.description.length > 0 &&
      projectdata.assigned_date.length > 0 &&
      projectdata.deadline.length > 0 &&
      projectdata.member.length > 0
    ) {
      updateProject(projectdata,location.state._id);

      e.target.reset();
    } else {
      console.log("cannot be empty");
    }
  };
  const navigate = useNavigate();
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
        <input type="text" className="textbox" name="projectname" required defaultValue={location.state.project_name} />
        <p className="input_label">Project Description</p>
        <input
          type="text"
          className="textbox"
          name="projectDescripation"
          required
          defaultValue={location.state.description}
        />
        <p className="input_label">Assigned Date</p>
        <input type="Date" className="textbox" name="assigenedate" required   defaultValue={moment(location.state.assigned_date).format("YYYY-MM-DD")}/>
        <p className="input_label">Project Deadline</p>
        <input type="Date" className="textbox" name="DeadLine"  defaultValue={moment(location.state.deadline).format("YYYY-MM-DD")} />
        <p className="input_label">Select Project Members</p>
        <Select options={options} isMulti onChange={populateMembers} required   defaultValue={defaultMembers || Select}/>
        <p className="input_label">Project Technologies</p>
        <Select options={stckOption} isMulti onChange={inputstck} required defaultValue={DefaultProjectTech} />
        <button type="submit" className="create_project">
          Update Project
        </button>
      </form>
    </div>
  );
}
