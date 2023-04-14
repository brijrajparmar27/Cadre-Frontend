import React from "react";
import "./ContactCard.css";
import avatar from "../../../../../assets/images/avatar.svg";
import group from "../../../../../assets/images/groupavatar.png";

export default function ContactCard({ each, handleChatOpen }) {
  return (
    <div
      className="contact_card"
      onClick={() => {
        handleChatOpen(each);
        // console.log("hello");
      }}
    >
      <div className="contact_dp_contain">
        <img
          src={each.isGroupChat ? group : avatar}
          alt=""
          className="contact_dp"
        />
      </div>
      <div className="contact_name">
        {each.name ? each.name : each.chatName}
      </div>
      <div className="contact_last_text">
        {each?.latestMessage?.content.substring(0, 20)}
        {each?.latestMessage?.content.length > 20 && "..."}
      </div>
    </div>
  );
}
