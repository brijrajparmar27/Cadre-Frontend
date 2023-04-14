import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../Pages/axios/axios";
import { setProjectData } from "../Pages/redux/projectDataSlice";
import useChat from "./useChat";
import { toast } from "react-toastify";

function useProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.logindataslice);
  const [coloumname, setColoumname] = useState("project_name");
  const [order, setOrder] = useState("desc");
  const [stackdata, setStackdata] = useState([]);

  const AddProject = async (data) => {
    try {
      const res = API.post("/add-project", data);
      return res;
    } catch (err) {
      console.log(err);
    }

    // } API.post("/add-project", data)
    //     .then((res) => {
    //       navigate("/dashboard");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };
  const getAllProject = (id, setLoading) => {
    setLoading(true);
    API.get(
      `/get-projectbyuserrole/${id}?sort={"column":"${coloumname}","order":"${order}"}`
    )
      .then((res) => {
        dispatch(setProjectData(res.data.res));
        setLoading(false);
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
  const addTask = async (data) => {
    // API.post('/add-task',data).then((res)=>{
    //   navigate("/project");
    // }).catch((err)=>{
    //   console.log(err);
    // })
    try {
      let res = await API.post("/add-task", data);
      return res;
      // console.log(data);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const getprojectbyProjectId = async (id) => {
    try {
      let res = await API.get(`/get-projectbyid/${id}`);
      return res;
    } catch (err) {
      return err;
    }
    // API.get(`/get-projectbyid/${id}`).then((res)=>{
    //   setProjectData(res.data)
    //   console.log(res.data)
    // }).catch((err)=>{
    //   console.log(err);
    // })
  };
  const updateProject = (data, id) => {
    API.put(`/update-project/${id}`, data)
      .then((res) => {
        // toast.success('project update successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteproject = (id) => {
    API.delete(`/delete-project/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    addTask,
    getprojectbyProjectId,
    updateProject,
    deleteproject,
  };
}

export default useProject;
