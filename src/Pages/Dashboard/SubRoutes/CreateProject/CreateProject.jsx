import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import useProject from "../../../../Hooks/useProject";
import useSendmail from "../../../../Hooks/useSendmail";
import useUserCollection from "../../../../Hooks/useUserCollection";
import "./CreateProject.css";
import useChat from "../../../../Hooks/useChat";
import { toast } from "react-toastify";
export default function CreateProject() {
  const [selectMebers, setSelectMebers] = useState([]);
  const [selectStack, setSelectStck] = useState([]);
  const { getAlluser, userdata } = useUserCollection();
  const { AddProject, getAllSatck, stackdata } = useProject();
  const { userData } = useSelector((state) => state.logindataslice);
  const { sendmail } = useSendmail();
  const { groupChat } = useChat();
  let options = userdata.map(function (data) {
    return { value: data, label: data.name };
  });
  let stckOption = stackdata.map((data) => {
    return { value: data, label: data.title };
  });
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
    delete currentUser.jwt;
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
      AddProject(projectdata).then((res) => {
        toast.success('new project add successfully');
        selectMebers.map((user) => {
          sendmail({
            name: user.email,
            subject: `Assigen project ${projectdata.project_name}`,
            message: projectdata.description,
          });
        });
        const users = res.data.member.map((item) => {
          return item._id;
        });
          groupChat(JSON.stringify(users), res.data.project_name);
        navigate("/dashboard");
      });

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
        <h1>Create Project</h1>
      </div>

      <form onSubmit={handelsubmit} className="create_content">
        <p className="input_label">Project Name</p>
        <input type="text" className="textbox" name="projectname" required />
        <p className="input_label">Project Description</p>
        <input
          type="text"
          className="textbox"
          name="projectDescripation"
          required
        />
        <p className="input_label">Assigned Date</p>
        <input type="Date" className="textbox" name="assigenedate" required />
        <p className="input_label">Project Deadline</p>
        <input type="Date" className="textbox" name="DeadLine" />
        <p className="input_label">Select Project Members</p>
        <Select options={options} isMulti onChange={populateMembers} required />
        <p className="input_label">Project Technologies</p>
        <Select options={stckOption} isMulti onChange={inputstck} required />
        <button type="submit" className="create_project">
          Add Project
        </button>
      </form>
    </div>
  );
}
