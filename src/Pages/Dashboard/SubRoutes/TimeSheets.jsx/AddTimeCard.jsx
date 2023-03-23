import { useState } from "react";
import Select from "react-select";
import ReactSwitch from "react-switch";
import { RxCross1 } from "react-icons/rx";

const AddTimeCard = ({ index, handleChange, each, handleRemove, works }) => {
  const options = [
    { value: "coodeit", label: "coodeit" },
    { value: "tridhya", label: "tridhya" },
    { value: "saligram", label: "saligram" },
  ];

  const getOptions = () => {
    let temp = works.map((each) => {
      return each.projectName;
    });
    return options.filter((each) => {
      return !temp.includes(each.value);
    });
    // return options;
  };

  const [checked, setChecked] = useState(false);

  return (
    <div className="sheet_card add_timesheet_form">
      <div className="sheet_card_header">
        <h2>Task-{index + 1}</h2>
        <RxCross1
          className="remove_icon"
          onClick={() => {
            handleRemove(index);
          }}
        />
      </div>
      <p className="name field_label">Project</p>
      <Select
        options={getOptions()}
        onChange={(e) => {
          handleChange(index, "projectName", e.value);
        }}
      ></Select>
      <p className="description field_label">Description</p>
      <textarea
        name="desc tb"
        cols="30"
        rows="10"
        className="tb desc_tb"
        onChange={(e) => {
          handleChange(index, "description", e.target.value.trim());
        }}
      ></textarea>
      <div className="ATS_section">
        <div className="ATS_Hrs">
          <p className="hours field_label">Hours Taken</p>
          <input
            type="number"
            name="hours"
            id="hours"
            className="tb"
            onChange={(e) => {
              handleChange(index, "hours", e.target.value.trim());
            }}
          />
        </div>
        <div className="ATS_Fin">
          <p className="completed field_label">Finished</p>
          <ReactSwitch
            onChange={() => {
              setChecked((prev) => {
                handleChange(index, "isCompleted", !prev);
                return !prev;
              });
            }}
            checked={checked}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTimeCard;
