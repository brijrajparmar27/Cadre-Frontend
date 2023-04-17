import React from "react";
import "./ChatSidebar.css";
import useChat from "../../../../../Hooks/useChat";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ContactCard from "../ContactCard/ContactCard";

export default function ChatSidebar({ setCurrentChat, state }) {
  const { getContacts, accessChat } = useChat();

  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState([]);

  const { userData } = useSelector((state) => state.logindataslice);

  useEffect(() => {
    getContacts(userData._id, query)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);
  if (state && state != null) {
    let d = contacts.find((each) => {
      if (each.chatName) {
        return each.chatName === state.project_name;
      }
    });
    setCurrentChat(d);
  }

  const handleChatOpen = (each) => {
    // console.log(each);
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

  return (
    <div className="chatsidebar">
      <h2 className="sidebar_heading">Contacts</h2>
      <div className="search_box">
        <input
          type="text"
          className="seatch_chats_tb"
          placeholder="Search chat"
          onChange={(e) => {
            setQuery(e.target.value.trim());
          }}
        />
      </div>
      <div className="chat_contacts" id="style-1">
        {contacts &&
          contacts.map((each) => {
            return (
              <ContactCard
                each={each}
                key={each._id}
                handleChatOpen={handleChatOpen}
              />
            );
          })}
      </div>
    </div>
  );
}
