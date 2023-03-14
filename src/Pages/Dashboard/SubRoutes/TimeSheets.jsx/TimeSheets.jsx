import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./TimeSheets.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment/moment";
import useTimeSheet from "../../../../Hooks/useTimeSheet";

export default function timesheets() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const { getTimeSheetbyUserId, timesheetdata } = useTimeSheet();
  useEffect(() => {
    console.log(value.toISOString());
  }, [value]);
  useEffect(() => {
    getTimeSheetbyUserId(`${moment(value).format("yyyy-MM-DD")}`);
  }, [value]);
  timesheetdata && console.log(timesheetdata);
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
                // getTimeSheetbyUserId(`${moment(e).format("yyyy-MM-DD")}`);
                setValue(e);
              }}
              value={value}
              className="calendar"
            />
          </div>
        </div>
        <div className="sheets_contain">
          {/* {timesheetdata?.map((data) => {
            return (
              <div className="table">
                {data.works.map((each) => {
                  return (
                    <tr>
                      <td className="time_cell">{each.projectName}</td>
                      <td className="time_cell">{each.description}</td>
                      <td className="time_cell">{each.hours}</td>
                      <td className="time_cell">
                        {each.isCompleted ? "completed" : "running"}
                      </td>
                    </tr>
                  );
                })}
              </div>
            );
          })} */}
          {
            <div className="container">
              <div className="table">
                <div className="table-header">
                  <div className="header__item">
                    <a id="name" className="filter__link" href="#">
                      Name
                    </a>
                  </div>
                  <div className="header__item">
                    <a
                      id="wins"
                      className="filter__link filter__link--number"
                      href="#"
                    >
                      description
                    </a>
                  </div>
                  <div className="header__item">
                    <a
                      id="draws"
                      className="filter__link filter__link--number"
                      href="#"
                    >
                      hours
                    </a>
                  </div>
                  <div className="header__item">
                    <a
                      id="losses"
                      className="filter__link filter__link--number"
                      href="#"
                    >
                      status
                    </a>
                  </div>
                </div>
                <div className="table-content">
                  {timesheetdata[0]?.works?.map((each) => {
                    return (
                      <div className="table-row">
                        <div className="table-data">{each.projectName}</div>
                        <div className="table-data">{each.description}</div>
                        <div className="table-data">{each.hours}</div>
                        <div className="table-data">
                          {each.isCompleted ? "completed" : "running"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
