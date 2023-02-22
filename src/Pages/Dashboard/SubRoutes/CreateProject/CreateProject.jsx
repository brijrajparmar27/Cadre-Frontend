import React, { useEffect } from "react";
import Select from "react-select";
import useUserCollection from "../../../../Hooks/useUserCollection";
import "./CreateProject.css";
export default function CreateProject() {
  const { getAlluser, userdata } = useUserCollection();
  let options = userdata.map(function (data) {
    return { value: data.name, label: data.name };
  });
  useEffect(() => {
    getAlluser();
  }, []);
  return (
    <div>
      <form>
        <div className="">
          Name
          <input type="text" className="textbox" />
          Descripation
          <input type="text" className="textbox" />
          Assigend Date
          <input type="Date" className="textbox" />
          DeadLine
          <input type="Date" className="textbox" />
          <Select options={options} />
        </div>
      </form>
    </div>
  );
}
