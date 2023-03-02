import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../Pages/axios/axios";
import { setProjectData } from "../Pages/redux/projectDataSlice";

function useProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.logindataslice);
  const [coloumname, setColoumname] = useState("project_name");
  const [order, setOrder] = useState("desc");
  const [stackdata, setStackdata] = useState([]);

  const AddProject = (data) => {
    API.post("/add-project", data)
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllProject = (id) => {
    API.get(
      `/get-projectbyuserrole/${id}?sort={"column":"${coloumname}","order":"${order}"}`
    )
      .then((res) => {
        dispatch(setProjectData(res.data.res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllSatck = () => {
    API.get("/get-all-stack")
      .then((res) => {
        setStackdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchProject = (val) => {
    API.get(`/get-project-by-search/${userData?._id}?search=${val}`)
      .then((res) => {
        dispatch(setProjectData(res.data.res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addTask=(data)=>{
    API.post('/add-task',data).then((res)=>{
      navigate("/project");
    }).catch((err)=>{
      console,log(err);
    })
  }
  return {
    AddProject,
    getAllProject,
    getAllSatck,
    stackdata,
    setColoumname,
    coloumname,
    order,
    setOrder,
    searchProject,
    addTask
  };
}

export default useProject;
