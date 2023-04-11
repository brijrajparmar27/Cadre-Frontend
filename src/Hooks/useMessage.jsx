import React, { useState } from "react";
import { useSelector } from "react-redux";
import API from "../Pages/axios/axios";

function useMessage() {
  const { userData } = useSelector((state) => state.logindataslice);
  const [displayMessage, setDisplayMessage] = useState();
  const config = {
    headers: { Authorization: `Bearer ${userData.jwt}` },
  };
  const sendMessage = async (chatdata) => {
    try {
      const res = await API.post("/message", chatdata, config);
      setDisplayMessage([...displayMessage, res.data]);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllMessage = (chatId) => {
    API.get(`/message/${chatId}`, config)
      .then((res) => {
        console.log(res);
        setDisplayMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { sendMessage, fetchAllMessage, displayMessage, setDisplayMessage };
}

export default useMessage;
