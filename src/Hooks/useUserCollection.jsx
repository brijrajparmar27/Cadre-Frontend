import React, { useState } from "react";
import API from "../Pages/axios/axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoginData } from "../Pages/redux/logindataslice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function useUserCollection() {
  const [userdata, setUserdata] = useState([]);
  const [userdataandProject, setUserdataandProject] = useState([]);
  const { userData } = useSelector((state) => state.logindataslice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const updateUserProfile = (data) => {
    // return  console.log(data,"data");
    API.patch(`/user-details-update/${userData._id}`, data)
      .then((res) => {
        let users = {
          ...userData,
          contact_number: data.contact_number,
          name: data.name,
        };
        dispatch(setLoginData(users));
        toast.success("profile update successfully");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletuser = async (id) => {
    try {
      const res = API.delete(`delete-user/${id}`);
      return res;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const updateuser = (data) => {
    try {
      const res = API.patch(`/user-details-update/${data._id}`, data);
      return res;
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
    updateUserProfile,
    deletuser,
    updateuser,
  };
}

export default useUserCollection;
