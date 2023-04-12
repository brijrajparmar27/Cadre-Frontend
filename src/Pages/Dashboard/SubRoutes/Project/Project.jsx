import "./Project.css";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
  BsInfoCircle,
  BsChatLeftText,
  BsPeople,
  BsPlusLg,
  BsArrowLeft,
  BsPen,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import useProject from "../../../../Hooks/useProject";
import Kanban from "./Components/Kanban/Kanban";
import { AiOutlineDelete } from "react-icons/ai";

export default function Project() {
  const [projectData, setProjectData] = useState(null);
  let location = useLocation();

  console.log(location);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.logindataslice);
  const { getprojectbyProjectId,deleteproject } = useProject();

  useEffect(() => {
    // console.log(location.state.projectdata._id);
    getprojectbyProjectId(location?.state?.projectdata._id).then((res) => {
      console.log(res.data);
      setProjectData({ ...res.data });
    });
  }, [location]);
  // useEffect(() => {
  // console.log("project data ", projectData);
  // projectData && console.log(projectData.task);
  // }, [projectData]);
  const  clickdeleteproject=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteproject(location.state.projectdata._id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(()=>{navigate('/dashboard')})
      }
    })
  }
  return (
    <>
      {projectData && (
        <div className="project">
          <div className="section_title">
            <BsArrowLeft
              className="back_icon"
              onClick={() => {
                navigate(-1);
              }}
            />
            <h1>Project Dashboard</h1>
          </div>
          <div className="section_content">
            <div className="section_header">
              <div className="top_bar">
                <div className="left">
                  <h2>{projectData?.project_name}</h2>
                  <BsInfoCircle
                    className="proj_fun_icons"
                    onClick={(e) => {
                      navigate("details", { state: projectData });
                    }}
                  />
                </div>

                {userData && userData.role_name === "Sr Devloper" || userData.role_name === "Admin" ? (
                  <button
                    className="create_task btn"
                    onClick={() => {
                      navigate("createTask", { state: projectData });
                    }}
                  >
                    <BsPlusLg className="add_btn" />
                    Create Task
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="bottom_bar">
                <div className="desc_contain">
                  {/* limit task desc to 521 characters */}
                  <p className="task_desc">
                    {projectData?.description?.substring(0, 236)}
                    {projectData?.description?.length > 521 && (
                      <span className="view-more">"..."</span>
                    )}
                  </p>
                </div>
                <div className="bottom_right">
                   {userData && userData.role_name === "Admin" ?<AiOutlineDelete className="proj_fun_icons" onClick={clickdeleteproject}></AiOutlineDelete>:''}
                  <BsPen className="proj_fun_icons" onClick={()=>navigate('EditProject',{ state: projectData })} />
                  <BsChatLeftText className="proj_fun_icons" onClick={()=>{navigate('/dashboard/chats',{state: projectData})}} />
                  <BsPeople className="proj_fun_icons" />
                </div>
              </div>
            </div>
            <div className="kanban_contain">
              <Kanban data={projectData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
