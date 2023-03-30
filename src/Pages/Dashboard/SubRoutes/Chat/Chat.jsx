import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useChat from "../../../../Hooks/useChat";
import useMessage from "../../../../Hooks/useMessage";
import useUserCollection from "../../../../Hooks/useUserCollection";
import "./Chat.css";

export default function Chat() {
  const { getAlluser, userdata } = useUserCollection();
  const [userChat, setuserChat] = useState();
  const { accessChat, FetchChat, selectedchat } = useChat();
  const { userData } = useSelector((state) => state.logindataslice);
  const { sendMessage, FetachallMessage, displayMessage } = useMessage();
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
    FetachallMessage(selectedchat?._id);
  }, [selectedchat]);
  return (
    <>
      <div className="chatsidebar">
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

      <div className="content">
        <div className="navbar">
          <a href="#home">{userChat?.name}</a>
        </div>
        {displayMessage?.map((data) => {
          return (
            <>
           { data.sender?._id === userData?._id ?
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <p>{data.content}</p>
              </div>:
              <div>
                <p>{data.content}</p>
              </div>}
            </>
          );
        })}

        <div className="chat__form">
          <form id="chat__form" onSubmit={sendingMessage}>
            <input
              id="text-message"
              type="text"
              name="chatBox"
              placeholder="Type your message here ..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}
