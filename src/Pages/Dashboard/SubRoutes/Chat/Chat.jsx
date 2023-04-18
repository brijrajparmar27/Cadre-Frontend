import React, { useEffect, useRef, useState } from "react";
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
import { io } from "socket.io-client";
import { useIsTyping } from "use-is-typing";
import Loading from "../../../../UniversalComponents/Loading/Loading";
import typingLottie from "../../../../assets/Lottie/typing.json";

const ENDPOINT = import.meta.env.VITE_BASEURL;
var socket, selectedChatcompare;
// const appendMessage = (setDisplayMessage, newMessageRecieved) => {
//   console.log("appending new message");
//   setDisplayMessage((prev) => [...prev, { ...newMessageRecieved }]);
// };
export default function Chat() {
  const { userData } = useSelector((state) => state.logindataslice);
  const { accessChat } = useChat();
  const { state } = useLocation();
  const [isTyping, register] = useIsTyping();
  const { fetchAllMessage, displayMessage, setDisplayMessage, sendMessage } =
    useMessage();

  const [currentChat, setCurrentChat] = useState(null);
  const [socketConnected, setscoketConnected] = useState(false);
  const [typing, settyping] = useState(false);
  const [istyping, setistyping] = useState(false);
  let prevID = null;
  const chatBoxRef = useRef(null);

  useEffect(() => {
    console.log("scroll to bottom");
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessage]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connected", () => setscoketConnected(true));
    socket.on("typing", () => setistyping(true));
    socket.on("stop typing", () => setistyping(false));
  }, []);

  useEffect(() => {
    console.log(istyping);
  });
  // }, [istyping]);

  const handleChatSend = (e) => {
    e.preventDefault();
    let newMsg = e.target.chatBox.value.trim();
    if (newMsg) {
      socket.emit("stop typing", currentChat._id);
      sendMessage({ content: newMsg, chatId: currentChat._id }).then((res) => {
        socket.emit("new message", res);
      });
    }

    e.target.reset();
  };
  useEffect(() => {
    if (!currentChat) {
      return;
    } else {
      fetchAllMessage(currentChat._id);
      socket.emit("join chat", currentChat._id);
      selectedChatcompare = currentChat;
    }
  }, [currentChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log(newMessageRecieved);
      if (
        !selectedChatcompare || // if chat is not selected or doesn't match current chat
        selectedChatcompare._id !== newMessageRecieved.chat._id
      ) {
      } else {
        displayMessage &&
          setDisplayMessage([...displayMessage, newMessageRecieved]);
        console.log(newMessageRecieved);
        console.log(displayMessage);
      }
    });
  });

  const getChatName = (currentChat) => {
    if (currentChat.isGroupChat) {
      return currentChat.chatName;
    } else {
      let temp = currentChat.users.filter((each) => {
        return each._id !== userData._id;
      });
      return temp[0].name;
    }
  };

  useEffect(() => {
    console.log("typing?", isTyping);
    currentChat && isTyping && socket.emit("typing", currentChat._id);
    currentChat && !isTyping && socket.emit("stop typing", currentChat._id);
  }, [isTyping]);

  return (
    <div className="ChatsPage">
      <div className="section_title">
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
                let sharp = true;
                if (each.sender._id == prevID) {
                  sharp = false;
                }
                prevID = each.sender._id;
                let fromMe = each.sender._id == userData._id;
                return (
                  <div
                    className={fromMe ? "chat_doc right" : "chat_doc left"}
                    key={each._id}
                  >
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
              <div className="botton_anchor" ref={chatBoxRef}></div>

              {istyping && (
                <div className="chat_doc left">
                  <div className="chatbubble_img_contain"></div>
                  <div className="bubble_typing">
                    <Loading isLoading={true} display={typingLottie} />
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSend} className="chat_form">
              <input
                id="text-message"
                type="text"
                name="chatBox"
                className="new_msg_box"
                placeholder="Type your message here ..."
                ref={register}
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
