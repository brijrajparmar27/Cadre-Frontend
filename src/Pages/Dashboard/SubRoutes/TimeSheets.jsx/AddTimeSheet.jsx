import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VscAdd } from "react-icons/vsc";
import "./AddTimeSheet.css";
import AddTimeCard from "./AddTimeCard";

function AddTimeSheet(e) {
  const { userData } = useSelector((state) => state.logindataslice);

  const [work, setWork] = useState([{}]);

  // const work = {
  //   projectName: "test",
  //   description: "test description",
  //   isCompleted: true,
  //   hours: 1.25,
  // };

  const Timesheetdata = {
    user: userData._id,
    Date: Date.now(),
    work,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Timesheetdata);
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
    console.log(work);
  }, [work]);

  return (
    <div className="add_timesheet_section">
      <div className="section_title">
        <h1>Add Timesheet</h1>
      </div>
      <div className="sheet_contain" id="style-1">
        {work.map((each, index) => {
          return (
            <AddTimeCard
              key={index}
              each={each}
              index={index}
              handleChange={handleChange}
              handleRemove={handleRemove}
            />
          );
        })}
        <div className="add_task_card sheet_card" onClick={addTaskform}>
          <div className="add_task_section">
            <VscAdd className="add_icon" />
            <h3>Add Task</h3>
          </div>
        </div>
        <button onClick={handleSubmit} className="submit_timesheet">
          Send Timesheet
        </button>
      </div>
    </div>
  );
}

export default AddTimeSheet;
