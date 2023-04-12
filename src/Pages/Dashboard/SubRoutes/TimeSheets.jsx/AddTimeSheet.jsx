import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VscAdd } from "react-icons/vsc";
import "./AddTimeSheet.css";
import AddTimeCard from "./AddTimeCard";
import useTimeSheet from "../../../../Hooks/useTimeSheet";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddTimeSheet(e) {
  const { userData } = useSelector((state) => state.logindataslice);
  const { Newtimesheet } = useTimeSheet();

  const [works, setWork] = useState([{}]);
  const [error, setError] = useState();
  const navigate=useNavigate();
  const today = new Date();

  const Timesheetdata = {
    user: userData._id,
    Date: today.toISOString().slice(0, 10),
    works,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Timesheetdata);
  
    if ( Timesheetdata && Timesheetdata.works[0] && Timesheetdata.works[0].projectName) {
      Newtimesheet(Timesheetdata);
    } else {
      //setError("field cannot be empty");
      toast.error("field cannot be empty")
    }
  };

  const handleChange = (index, key, value) => {
    setWork((prev) => {
      const temp = prev;
      temp[index][key] = value;
      return [...temp];
    });
  };
  const handleRemove = (Targetindex) => {
    setWork((prev) => {
      return prev.filter((each, index) => {
        return index !== Targetindex;
      });
    });
  };
  const addTaskform = () => {
    setWork((prev) => [...prev, {}]);
  };

  useEffect(() => {
    console.log(works);
  }, [works]);

  return (
    <div className="add_timesheet_section">
      <div className="section_title">
      <BsArrowLeft
          className="back_icon"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1>Add Timesheet</h1>
      </div>
      <div className="sheet_contain" id="style-1">
        {works.map((each, index) => {
          return (
            <AddTimeCard
              key={index}
              each={each}
              index={index}
              handleChange={handleChange}
              handleRemove={handleRemove}
              works={works}
            />
          );
        })}
        <div className="add_task_card sheet_card" onClick={addTaskform}>
          <div className="add_task_section">
            <VscAdd className="add_icon" />
            <h3>Add Task</h3>
          </div>
        </div>
        <p className="error_msg">{error}</p>
        <button onClick={handleSubmit} className="submit_timesheet">
          Send Timesheet
        </button>
      </div>
    </div>
  );
}

export default AddTimeSheet;
