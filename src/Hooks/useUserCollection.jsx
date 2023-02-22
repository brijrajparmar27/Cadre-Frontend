import React, { useState } from 'react'
import API from '../Pages/axios/axios'

function useUserCollection() {
    const [userdata,setUserdata]=useState([])
    const getAlluser=()=>{
        API.get('/get-alluser').then((res)=>{
            setUserdata(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
  return{
    getAlluser,
    userdata
  }
}

export default useUserCollection
