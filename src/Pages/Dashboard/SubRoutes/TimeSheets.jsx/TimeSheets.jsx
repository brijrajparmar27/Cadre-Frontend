import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import './Timesheet.css'

export default function TimeSheets() {
  const navigate=useNavigate();
  return (
    <div className="TimeSheet">
      <div className="section_title">
        <h1>TimeSheet</h1>
      </div>
      <div className="TimeSheet_contain">
        <button
          className="add_timeSheet btn"
          onClick={() => {
            navigate("addTimesheet");
          }}
        >
          <BsPlusLg className="add_btn"/>
          Add Timesheet
        </button>
      </div>
    </div>
  );
}
