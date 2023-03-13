import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./TimeSheets.css";

export default function timesheets() {
  const navigate = useNavigate();
  return (
    <div className="timesheet">
      <div className="section_title">
        <h1>Timesheet</h1>
        <button
          className="add_timesheet btn"
          onClick={() => {
            navigate("addtimesheet");
          }}
        >
          <BsPlusLg className="add_btn" />
          Add Timesheet
        </button>
      </div>
      <div className="timesheet_contain">
        <div className="calendar_contain"></div>
        <div className="sheets_contain"></div>
      </div>
    </div>
  );
}
