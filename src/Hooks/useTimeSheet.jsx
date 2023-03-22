import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../Pages/axios/axios";

function useTimeSheet(setLoading) {
  const [timesheetdata, setTimesheetdata] = useState([]);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.logindataslice);
  const Newtimesheet = (data) => {
    API.post("/add-timesheet", data)
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTimeSheetbyUserId = (date) => {
    setLoading(true);
    API.get(`get-timesheet/${userData._id}?date=${date}`)
      .then((res) => {
        setTimesheetdata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return { Newtimesheet, getTimeSheetbyUserId, timesheetdata };
}

export default useTimeSheet;
