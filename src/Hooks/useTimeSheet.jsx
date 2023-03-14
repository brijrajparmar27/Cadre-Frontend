import React from 'react'
import { useSelector } from 'react-redux';
import API from '../Pages/axios/axios'

function useTimeSheet() {
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
            console.log(res)
        }).catch((err)=>{
            console.log(err);
        })
    }
  return {Newtimesheet,getTimeSheetbyUserId}
}

export default useTimeSheet
