import React, { useState } from "react";
import "./Kanban.css";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

export default function Kanban() {
  const [showClosed, setShowClosed] = useState(false);
  const hideClosed = {
    gridTemplateRows: `6fr 0.3fr`,
    gridTemplateColumns: `1fr 1fr 1fr`,
    gridTemplateAreas: `
        pending running completed
        footer footer footer`,
  };
  return (
    <div className="kanban" style={showClosed ? {} : hideClosed}>
      <div className="pending">pending</div>
      <div className="running">running</div>
      <div className="completed">completed</div>
      <div
        className="kanban_footer"
        onClick={() => {
          setShowClosed((prev) => !prev);
        }}
      >
        <p>{showClosed ? "Hide Closed" : "Show Closed"}</p>
        {!showClosed && <MdOutlineKeyboardArrowUp className="footer_icon" />}
        {showClosed && <MdOutlineKeyboardArrowDown className="footer_icon" />}
      </div>
      {showClosed && <div className="closed">closed</div>}
    </div>
  );
}
