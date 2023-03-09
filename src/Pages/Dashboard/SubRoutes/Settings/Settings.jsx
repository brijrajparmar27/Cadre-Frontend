import React from "react";

export default function Settings() {
  return (
    <>
      <div className="setting">
        <div className="section_title">
          <h1>Project Details</h1>
        </div>
        <div className="setting_contain">
           <form>
                Name<input></input>
                Phone<input></input>
           </form>
        </div>
      </div>
    </>
  );
}
