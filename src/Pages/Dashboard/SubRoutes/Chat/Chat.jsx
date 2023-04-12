import React, { useEffect, useState } from "react";
import "./Chat.css";
import useChat from "../../../../Hooks/useChat";
import { useSelector } from "react-redux";
import useMessage from "../../../../Hooks/useMessage";
import { current } from "@reduxjs/toolkit";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import ContactCard from "./ContactCard/ContactCard";
import { TbSend } from "react-icons/tb";
import cat from "../../../../assets/Lottie/cat.json";

import avatar from "../../../../assets/images/avatar.svg";
import group from "../../../../assets/images/groupavatar.png";
import { useLocation } from "react-router-dom";
import Empty from "../../../../UniversalComponents/Empty/Empty";

const ENDPOINT = "http://localhost:4040/";
export default function Chat() {
  const { userData } = useSelector((state) => state.logindataslice);
  const { accessChat } = useChat();
  const { state } = useLocation();
  const { fetchAllMessage, displayMessage, setDisplayMessage, sendMessage } =
    useMessage();

  const [currentChat, setCurrentChat] = useState(null);
  let prevID = null;

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
        <ChatSidebar setCurrentChat={setCurrentChat} state={state} />

        {currentChat && (
          <div className="content">
            <div className="navbar">
              <img
                src={currentChat?.isGroupChat ? group : avatar}
                className="contact_dp"
              />
              {currentChat && <a href="#home">{getChatName(currentChat)}</a>}
            </div>
            <div className="chats_contain" id="style-1">
              {displayMessage?.map((each) => {
                console.log(each);
                let sharp = true;
                if (each.sender._id == prevID) {
                  sharp = false;
                }
                console.log(each.sender._id, prevID);
                prevID = each.sender._id;
                let fromMe = each.sender._id == userData._id;
                return (
                  <div className={fromMe ? "chat_doc right" : "chat_doc left"}>
                    <div className="chatbubble_img_contain">
                      {!fromMe && sharp && (
                        <img
                          src={avatar}
                          alt=""
                          className="chatbubble_avatar"
                        />
                      )}
                    </div>
                    <div className={sharp ? "bubble active" : "bubble passive"}>
                      {!fromMe && sharp && (
                        <p className="bubble_title">{each.sender.name}</p>
                      )}
                      <p className="bubble_content">{each.content}</p>
                    </div>
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
        )}

        {!currentChat && (
          <div className="chat_lottie_contain">
            <Empty isLoading={false} isEmpty={!currentChat} display={cat} />
          </div>
        )}
      </div>
    </div>
  );
}
