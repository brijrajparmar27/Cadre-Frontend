import React from "react";
import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();
  console.log(location?.state);
  return (
    <div className="details">
      <div className="section_title">
        <h1>Project Details</h1>
      </div>
    </div>
  );
}

export default Details;
