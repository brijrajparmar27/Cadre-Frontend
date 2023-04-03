import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useChat from "../../../../Hooks/useChat";
import useMessage from "../../../../Hooks/useMessage";
import useUserCollection from "../../../../Hooks/useUserCollection";
import "./Chat.css";
import io from "socket.io-client";

export default function Chat() {
  const { getAlluser, userdata } = useUserCollection();
  const [userChat, setuserChat] = useState();
  const { accessChat, FetchChat, selectedchat } = useChat();
  const { userData } = useSelector((state) => state.logindataslice);
  const { sendMessage, FetachallMessage, displayMessage } = useMessage();
  const ENDPOINT = "http://localhost:4040";
  var soket, selectedchatcompare;
  const clickuser = (data) => {
    setuserChat(data);
    try {
      accessChat(data._id);
    } catch (err) {
      console.log(err);
    }
  };
  const sendingMessage = (e) => {
    e.preventDefault();
    sendMessage({
      content: e.target.chatBox.value,
      chatId: selectedchat._id,
    });
  };
  useEffect(() => {
    getAlluser();
  }, []);
  useEffect(() => {
    if (!selectedchat) {
      return;
    } else {
      FetachallMessage(selectedchat?._id);
    }
  }, [selectedchat]);
  useEffect(() => {
    io(ENDPOINT);
  }, []);

  return (
    <div className="chats">
      <div className="chatsidebar">
        <input type="text" className="search_box" />
        <div className="chat_contacts">
          {userdata?.map((data) => {
            return (
              <a
                onClick={() => {
                  clickuser(data);
                }}
              >
                {data.name}
              </a>
            );
          })}
        </div>
      </div>

      <div className="content">
        <div className="navbar">
          <a href="#home">{userChat?.name}</a>
        </div>
        <div className="chats_contain">
          {displayMessage?.map((data) => {
            return (
              <>
                {data.sender?._id === userData?._id ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p>{data.content}</p>
                  </div>
                ) : (
                  <div>
                    <p>{data.content}</p>
                  </div>
                )}
              </>
            );
          })}
        </div>

        <form onSubmit={sendingMessage} className="chat_form">
          <input
            id="text-message"
            type="text"
            name="chatBox"
            className="new_msg_box"
            placeholder="Type your message here ..."
          />
          <button type="submit" className="new_msg_send">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
