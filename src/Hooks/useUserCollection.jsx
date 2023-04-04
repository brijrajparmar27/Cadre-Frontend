import React, { useState } from "react";
import API from "../Pages/axios/axios";
import { useSelector } from "react-redux";

function useUserCollection() {
  const [userdata, setUserdata] = useState([]);
  const [userdataandProject, setUserdataandProject] = useState([]);
  const { userData } = useSelector((state) => state.logindataslice);
  const getAlluser = () => {
    API.get(`/get-alluser?sort={"column":"name","order":"asc"}`)
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateUserDP = (data) => {
    API.post(`/update-user-dp`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAlluserAndProject = async () => {
    try {
      const res = await API.get(`/get-user-and-project/${userData._id}`);
      setUserdataandProject(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getAlluser,
    userdata,
    updateUserDP,
    getAlluserAndProject,
    userdataandProject,
  };
}

export default useUserCollection;
