import React, { useEffect, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
import useChat from "../../../../Hooks/useChat";
import { useSelector } from "react-redux";
const ENDPOINT = "http://localhost:4040/";
export default function Chat() {
  const { userData } = useSelector((state) => state.logindataslice);
  const { getContacts } = useChat();
  const [contacts, setContacts] = useState([]);
  const [CurrentChat, setCurrentChat] = useState(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    console.log(query);
  }, [query]);
  useEffect(() => {
    getContacts(userData._id, query)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);
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
                <p key={each._id}>
                  {each.name ? each.name : each.project_name}
                </p>
              );
            })}
        </div>
      </div>

      <div className="content">
        <div className="navbar">
          <a href="#home">home</a>
        </div>
        <div className="chats_contain"></div>

        <form onSubmit={() => {}} className="chat_form">
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
