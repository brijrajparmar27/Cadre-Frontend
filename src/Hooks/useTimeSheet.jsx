import React from 'react'
import API from '../Pages/axios/axios'

function useTimeSheet() {
    const Newtimesheet=(data)=>{
        API.post('/add-timesheet',data).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err);
        })
    }
  return {Newtimesheet}
}

export default useTimeSheet
