import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import API from "../Pages/axios/axios";

function useChat() {
  const [chatData, setChatData] = useState();

  const { userData } = useSelector((state) => state.logindataslice);

  const config = {
    headers: { Authorization: `Bearer ${userData.jwt}` },
  };

  const accessChat = (userId) => {
    return API.post("/chat", { userId }, config);
  };

  const getContacts = (id, query) => {
    return API.get(`/get-user-and-project/${id}?search=${query}`);
  };

  const groupChat = (users, name) => {
    API.post("/Groupchat", { users, name }, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FetchChat = () => {
    API.get("/chat", config)
      .then((res) => {
        setChatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    accessChat,
    FetchChat,
    groupChat,
    chatData,
    getContacts,
  };
}

export default useChat;
