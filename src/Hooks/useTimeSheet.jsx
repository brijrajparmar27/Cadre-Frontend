import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../Pages/axios/axios";
import { toast } from "react-toastify";

function useTimeSheet(setLoading) {
  const [timesheetdata, setTimesheetdata] = useState([]);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.logindataslice);
  const Newtimesheet = (data) => {
    API.post("/add-timesheet", data)
      .then((res) => {
        toast.success("project update successfully");
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
        console.log(res.data);
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
