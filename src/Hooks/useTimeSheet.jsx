import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import API from '../Pages/axios/axios'

function useTimeSheet() {
    const [timesheetdata,setTimesheetdata]=useState([]);
    const { userData } = useSelector((state) => state.logindataslice);
    const Newtimesheet=(data)=>{
        API.post('/add-timesheet',data).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err);
        })
    }
    const getTimeSheetbyUserId=(date)=>{
        API.get(`get-timesheet/${userData._id}?date=${date}`).then((res)=>{
            setTimesheetdata(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
  return {Newtimesheet,getTimeSheetbyUserId,timesheetdata}
}

export default useTimeSheet
