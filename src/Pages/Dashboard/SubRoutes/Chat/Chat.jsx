import React, { useEffect, useState } from "react";
import "./Chat.css";
import useChat from "../../../../Hooks/useChat";
import { useSelector } from "react-redux";
import useMessage from "../../../../Hooks/useMessage";
import { current } from "@reduxjs/toolkit";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import ContactCard from "./ContactCard/ContactCard";
import { TbSend } from "react-icons/tb";

import avatar from "../../../../assets/images/avatar.svg";
import group from "../../../../assets/images/groupavatar.png";

const ENDPOINT = "http://localhost:4040/";
export default function Chat() {
  const { userData } = useSelector((state) => state.logindataslice);
  const { accessChat } = useChat();
  const { fetchAllMessage, displayMessage, setDisplayMessage, sendMessage } =
    useMessage();

  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (!currentChat) {
      return;
    } else {
      fetchAllMessage(currentChat._id);
    }
  }, [currentChat]);

  const handleChatSend = (e) => {
    e.preventDefault();
    let newMsg = e.target.chatBox.value.trim();
    if (newMsg) {
      sendMessage({ content: newMsg, chatId: currentChat._id });
    }

    e.target.reset();
  };

  const getChatName = (currentChat) => {
    if (currentChat.isGroupChat) {
      return currentChat.chatName;
    } else {
      let temp = currentChat.users.filter((each) => {
        return each._id !== userData._id;
      });
      return temp[0].name;
    }
    return "hello";
  };

  return (
    <div className="ChatsPage">
      <div className="section_title">
        {/* <BsArrowLeft
          className="back_icon"
          onClick={() => {
            navigate(-1);
          }}
        /> */}
        <h1>Chats</h1>
      </div>
      <div className="chats">
        <ChatSidebar setCurrentChat={setCurrentChat} />

        <div className="content">
          <div className="navbar">
            <img
              src={currentChat?.isGroupChat ? group : avatar}
              className="contact_dp"
            />
            {currentChat && <a href="#home">{getChatName(currentChat)}</a>}
          </div>
          <div className="chats_contain">
            {displayMessage?.map((each) => {
              return (
                <div>
                  {each.sender.name}:-- {each.content}
                </div>
              );
            })}
          </div>
          <form onSubmit={handleChatSend} className="chat_form">
            <input
              id="text-message"
              type="text"
              name="chatBox"
              className="new_msg_box"
              placeholder="Type your message here ..."
            />
            <button type="submit" className="new_msg_send">
              <TbSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
