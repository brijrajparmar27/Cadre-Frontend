import React, { useState } from "react";
import API from "../Pages/axios/axios";

function useUserCollection() {
  const [userdata, setUserdata] = useState([]);
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
  return {
    getAlluser,
    userdata,
    updateUserDP,
  };
}

export default useUserCollection;
