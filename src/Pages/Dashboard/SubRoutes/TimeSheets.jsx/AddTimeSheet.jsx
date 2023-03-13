import React from "react";
import { useSelector } from "react-redux";
import useTimeSheet from "../../../../Hooks/useTimeSheet";
import "./AddTimeSheet.css";

function AddTimeSheet(e) {
  const { Newtimesheet } = useTimeSheet();
  const { userData } = useSelector((state) => state.logindataslice);
  const onsubmit = (e) => {
    e.preventDefault();
    const Timesheetdata = {
      projectName: e.target.projectName.value,
      discription: e.target.des.value,
      status: true,
      date: e.target.date.value,
      hours: e.target.hours.value,
      user: userData._id,
    };
    Newtimesheet(Timesheetdata);
  };

  return (
    <div className="add_timesheet_section">
      <div className="section_title">
        <h1>Add Timesheet</h1>
      </div>
      <form onSubmit={onsubmit} className="add_timesheet_form">
        <p className="title field_label"> Project Name</p>
        <input name="projectName" className="tb description"></input>
        Descripation<input name="des" className="tb description"></input>
        Date<input type="date" name="date" className="textbox tb"></input>
        Working Hours
        <input type="text" name="hours" className="textbox tb"></input>
        <button type="submit" className="submit_timesheet">
          submit
        </button>
      </form>
    </div>
  );
}

export default AddTimeSheet;
