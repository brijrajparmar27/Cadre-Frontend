import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./TimeSheets.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment/moment";

export default function timesheets() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    console.log(value.toISOString());
  }, [value]);
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
        <div className="calendar_contain">
          <div className="calendar_date">
            <h3 className="selected_date">
              {`${moment(value).format("Do MMMM YYYY, dddd")}`}
            </h3>

            <Calendar
              onChange={(e) => {
                setValue(e);
              }}
              value={value}
              className="calendar"
            />
          </div>
        </div>
        <div className="sheets_contain"></div>
      </div>
    </div>
  );
}
