import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useChat from "../../../../Hooks/useChat";
import useMessage from "../../../../Hooks/useMessage";
import useUserCollection from "../../../../Hooks/useUserCollection";
import "./Chat.css";
import io from "socket.io-client";

export default function Chat() {
  const { getAlluser, userdata, getAlluserAndProject, userdataandProject } =
    useUserCollection();
  const [userChat, setuserChat] = useState();
  const { accessChat, FetchChat, selectedchat, groupChat,getChatdata,setSelectedChat } = useChat();
  const { userData } = useSelector((state) => state.logindataslice);
  const { sendMessage, FetachallMessage, displayMessage } = useMessage();
  console.log(getChatdata)
  const clickuser = (data) => {
    console.log(data);
    setuserChat(data);
    if(data.isGroupChat == false){
      try {
        accessChat(data?.users[1]?._id);
      } catch (err) {
        console.log(err);
      }
    }else{
      setSelectedChat(data)
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
    FetchChat()
  }, []);
  useEffect(() => {
    if (!selectedchat) {
      return;
    } else {
      FetachallMessage(selectedchat?._id);
    }
  }, [selectedchat]);
  useEffect(() => {
    //io(ENDPOINT);
  }, []);
  return (
    <div className="chats">
      <div className="chatsidebar">
        <input type="text" className="search_box" />
        <div className="chat_contacts">
          {getChatdata?.map((data) => {
            return (
              <>
                {data?.isGroupChat == true ? (
                  <a
                    onClick={() => {
                      clickuser(data);
                    }}
                  >
                    {data.chatName}
                  </a>
                ) : (
                  <a
                  onClick={() => {
                    clickuser(data);
                  }}
                >
                  {data && data.users && data.users[1]?.name}
                </a>
                )}
              </>
            );
          })}
        </div>
      </div>

      <div className="content">
        <div className="navbar">
          <a href="#home">{userChat?.isGroupChat == true ? userChat?.chatName : userChat?.users[1]?.name}</a>
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
