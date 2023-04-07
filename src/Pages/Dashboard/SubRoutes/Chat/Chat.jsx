import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useChat from "../../../../Hooks/useChat";
import useMessage from "../../../../Hooks/useMessage";
import useUserCollection from "../../../../Hooks/useUserCollection";
import "./Chat.css";
import io from "socket.io-client";
import Select from "react-select";
const ENDPOINT = "http://localhost:4040/";
var socket, selectedchatCompare;
export default function Chat() {
  const { getAlluser, userdata} =
    useUserCollection();
  const [userChat, setuserChat] = useState();
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setisTyping] = useState(false);
  const {
    accessChat,
    FetchChat,
    selectedchat,
    groupChat,
    getChatdata,
    setSelectedChat,
  } = useChat();
  const { userData } = useSelector((state) => state.logindataslice);
  const { sendMessage, FetachallMessage, displayMessage, setDisplayMessage } =
    useMessage();

  const clickuser = (data) => {
    setuserChat(data);
    if (data.isGroupChat == false) {
      try {
        accessChat(data?.users[1]?._id);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSelectedChat(data);
    }
  };
  const sendingMessage = (e) => {
    socket.emit("stope typing", selectedchat._id);
    e.preventDefault();
    sendMessage({
      content: e.target.chatBox.value,
      chatId: selectedchat._id,
    }).then((res) => {
      socket.emit("new message", res);
    });
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connected", () => setSocketConnection(true));
    socket.on("typing", () => setisTyping(true));
    socket.on("stope typing", () => setisTyping(false));
  }, []);
  useEffect(() => {
    FetchChat();
    getAlluser();
  }, []);
  useEffect(() => {
    console.log("mess");
    socket.on("message", (newMessageRecive) => {
      console.log("newmessage", newMessageRecive);
      console.log(selectedchatCompare);
      if (
        !selectedchatCompare ||
        selectedchatCompare._id === newMessageRecive.chat._id
      ) {
        //give notification
        console.log("fjfj");
      } else {
        setDisplayMessage([...displayMessage, newMessageRecive]);
      }
    });
  });
  useEffect(() => {
    if (!selectedchat) {
      return;
    } else {
      FetachallMessage(selectedchat?._id);
      socket.emit("join chat", selectedchat._id);
      selectedchatCompare = selectedchat;
    }
  }, [selectedchat]);
  const typinghandele = () => {
    console.log(socketConnection);
    console.log(typing);
    if (!socketConnection) return;
    if (!typing) {
      console.log("typing");
      setTyping(true);
      socket.emit("typing", selectedchat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerlenght = 3000;
    setTimeout(() => {
      var timenow = new Date().getTime();
      let timediff = timenow - lastTypingTime;
      if (timediff >= timerlenght && typing) {
        socket.emit("stope typing", selectedchat._id);
        setTyping(false);
      }
    }, timerlenght);
  };
  let options = userdata.map(function (data) {
    return { value: data, label: data.name };
  });
  const inputsearch = (members) => {
    console.log(members);
    //setuserChat(members.label)
    accessChat(members.value._id);
  };
  return (
    <div className="chats">
      <div className="chatsidebar">
        <Select options={options} onChange={inputsearch} required />
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
          <a href="#home">
            {userChat?.isGroupChat == true
              ? userChat?.chatName
              : userChat?.users[1]?.name}
          </a>
        </div>
        <div className="chats_contain">
          {displayMessage?.map((data) => {
            return (
              <>
                {data?.sender?._id === userData?._id ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p>{data?.content}</p>
                  </div>
                ) : (
                  <div>
                    <p>{data?.content}</p>
                  </div>
                )}
              </>
            );
          })}
           {isTyping ? "typing...." : ""}
        </div>

        <form onSubmit={sendingMessage} className="chat_form">
          <input
            id="text-message"
            type="text"
            name="chatBox"
            className="new_msg_box"
            placeholder="Type your message here ..."
            onChange={typinghandele}
          />
          <button type="submit" className="new_msg_send">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
