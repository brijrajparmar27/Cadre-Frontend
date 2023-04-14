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
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:4040/";
var socket,selectedChatcompare;
export default function Chat() {
  const { userData } = useSelector((state) => state.logindataslice);
  const { accessChat } = useChat();
  const { state } = useLocation();
  const { fetchAllMessage, displayMessage, setDisplayMessage, sendMessage } =
    useMessage();

  const [currentChat, setCurrentChat] = useState(null);
  const [socketConnected,setscoketConnected]=useState(false);
  const [typing,settyping]=useState(false);
  const[istyping,setistyping]=useState(false);
  let prevID = null;
  useEffect(()=>{
    socket=io(ENDPOINT);
    socket.emit('setup',(userData));
    socket.on("connected",()=>setscoketConnected(true));
    socket.on('typing',()=>setistyping(true));
    socket.on("stop typing", () => setistyping(false));;
   },[])


   const handleChatSend = (e) => {
    e.preventDefault();
    let newMsg = e.target.chatBox.value.trim();
    if (newMsg) {
      socket.emit("stop typing", currentChat._id);
      sendMessage({ content: newMsg, chatId: currentChat._id }).then((res)=>{
        socket.emit('new message',res)
      });
     
    }

    e.target.reset();
  };
  useEffect(() => {
    if (!currentChat) {
      return;
    } else {
      fetchAllMessage(currentChat._id);
      socket.emit('join chat',currentChat._id);
      selectedChatcompare=currentChat
    }
  }, [currentChat]);
  // useEffect(()=>{
  //   console.log('mmw')
  //   socket.on('message recieved',(newmeassgerecive)=>{
  //     console.log('ndnd',newmeassgerecive);
  //     if(!selectedChatcompare || selectedChatcompare._id !== newmeassgerecive.chat._id){
  //       //give notification
  //     }
  //     else{
  //       setDisplayMessage([...displayMessage,newmeassgerecive]);
  //     }
  //   })
  // })

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatcompare || // if chat is not selected or doesn't match current chat
        selectedChatcompare._id !== newMessageRecieved.chat._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        console.log("send",newMessageRecieved)
        setDisplayMessage([...displayMessage,newMessageRecieved]);
      }
    });
  });

  console.log(displayMessage);


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
  const typingHandler = (e) => {
    //setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      settyping(true);
      socket.emit("typing", currentChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stope typing", currentChat._id);
        settyping(false);
      }
    }, timerLength);
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
                let sharp = true;
                if (each.sender._id == prevID) {
                  sharp = false;
                }
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
              {istyping ? <div>....typing</div>:''}
              <input
                id="text-message"
                type="text"
                name="chatBox"
                className="new_msg_box"
                placeholder="Type your message here ..."
                onChange={typingHandler}
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
