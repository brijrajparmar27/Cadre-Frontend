import React from "react";
import { useLocation } from "react-router-dom";

export default function Project() {
  let location = useLocation();
  console.log(location)
  return <div>Project</div>;
}
