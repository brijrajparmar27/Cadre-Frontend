import React, { useEffect, useState } from "react";
import "./Chat.css";
import useChat from "../../../../Hooks/useChat";
import { useSelector } from "react-redux";
import useMessage from "../../../../Hooks/useMessage";
import { current } from "@reduxjs/toolkit";
const ENDPOINT = "http://localhost:4040/";
export default function Chat() {
  const { userData } = useSelector((state) => state.logindataslice);
  const { getContacts, accessChat } = useChat();
  const { fetchAllMessage, displayMessage, setDisplayMessage, sendMessage } =
    useMessage();

  const [currentChat, setCurrentChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getContacts(userData._id, query)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  useEffect(() => {
    if (!currentChat) {
      return;
    } else {
      // console.log(currentChat._id);
      fetchAllMessage(currentChat._id);
    }
  }, [currentChat]);

  const handleChatOpen = (each) => {
    if (each.isGroupChat) {
      setCurrentChat(each);
    } else {
      accessChat(each._id)
        .then((chat) => {
          setCurrentChat(chat.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    let newMsg = e.target.chatBox.value.trim();
    if (newMsg) {
      sendMessage({ content: newMsg, chatId: currentChat._id });
    }

    e.target.reset();
  };

  return (
    <div className="chats">
      <div className="chatsidebar">
        <input
          type="text"
          className="search_box"
          onChange={(e) => {
            setQuery(e.target.value.trim());
          }}
        />
        <div className="chat_contacts">
          {contacts &&
            contacts.map((each) => {
              return (
                <p
                  key={each._id}
                  onClick={() => {
                    handleChatOpen(each);
                  }}
                >
                  {each.name ? each.name : each.chatName}
                </p>
              );
            })}
        </div>
      </div>

      <div className="content">
        <div className="navbar">
          <a href="#home">home</a>
        </div>
        <div className="chats_contain">
          {displayMessage?.map((each) => {
            return (
              <div key={each._id}>
                {each.sender.name}:- {each.content}
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
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
